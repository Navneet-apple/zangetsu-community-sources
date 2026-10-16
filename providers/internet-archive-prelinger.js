// Internet Archive: Prelinger public-domain/educational film collection.
// Experimental community provider. Availability and rights can vary by individual item.
var IA_API = 'https://archive.org/advancedsearch.php';
var IA_META = 'https://archive.org/metadata/';
var IA_ITEM = 'https://archive.org/details/';
var SOURCE_ID = 'ia-prelinger';
function getInfo() {
  return { name: 'Internet Archive (Prelinger)', lang: 'en',
    baseUrl: 'https://archive.org/details/prelinger', type: 'movie', version: '0.1.0' };
}
function _getJson(url) {
  return fetch(url, { headers: { 'User-Agent': 'ZangetsuCommunitySources/0.1 (public catalog)' } })
    .then(function (r) { return JSON.parse(r.body || '{}'); });
}
function _clean(s) { return String(s || '').replace(/<[^>]*>/g, '').trim(); }
function _search(q, page) {
  var query = 'collection:prelinger AND mediatype:movies';
  if (q) query += ' AND title:(' + String(q).replace(/[+&|!(){}\[\]^"~*?:\\/]/g, ' ') + ')';
  var url = IA_API + '?q=' + encodeURIComponent(query) +
    '&fl[]=identifier&fl[]=title&fl[]=description&fl[]=year&rows=24&page=' +
    Math.max(1, Number(page) || 1) + '&output=json';
  return _getJson(url).then(function (j) {
    var docs = (j && j.response && j.response.docs) || [];
    return docs.map(function (d) {
      var id = String(d.identifier || '');
      return { id: id, title: _clean(d.title) || id, englishTitle: _clean(d.title) || id,
        type: 'movie', sourceId: SOURCE_ID, url: IA_ITEM + encodeURIComponent(id), cover: 'https://archive.org/services/img/' + encodeURIComponent(id),
        description: _clean(Array.isArray(d.description) ? d.description[0] : d.description),
        year: d.year || null };
    });
  }).catch(function () { return []; });
}
function search(query, page, opts) { return _search(query, page); }
function getHome(opts) {
  return _search('', 1).then(function (items) {
    return items.length ? [{ title: 'Prelinger Archive', items: items }] : [];
  });
}
function getDetail(url, opts) {
  var id = String(url || '').split('/').pop().split('?')[0];
  return _getJson(IA_META + encodeURIComponent(id)).then(function (j) {
    var m = (j && j.metadata) || {};
    var title = _clean(Array.isArray(m.title) ? m.title[0] : m.title) || id;
    var desc = _clean(Array.isArray(m.description) ? m.description[0] : m.description);
    return { id: id, title: title, englishTitle: title, type: 'movie', sourceId: SOURCE_ID, url: IA_ITEM + encodeURIComponent(id),
      cover: 'https://archive.org/services/img/' + encodeURIComponent(id), description: desc,
      episodes: [{ id: id, title: 'Play film', url: id }] };
  }).catch(function () {
    return { id: id, title: id, type: 'movie', sourceId: SOURCE_ID, url: IA_ITEM + encodeURIComponent(id), episodes: [{ id: id, title: 'Play film', url: id }] };
  });
}
function getEpisodes(url, opts) {
  return getDetail(url, opts).then(function (d) { return d.episodes || []; });
}
function getVideoSources(episodeUrl) {
  var id = String(episodeUrl || '').split('/').pop().split('?')[0];
  return _getJson(IA_META + encodeURIComponent(id)).then(function (j) {
    var files = (j && j.files) || [];
    var candidates = files.filter(function (f) {
      return f && f.name && /\.mp4$/i.test(f.name) &&
        !/thumb|sample|preview/i.test(f.name) &&
        (!f.source || f.source === 'original' || f.source === 'derivative');
    }).sort(function (a, b) { return (Number(b.height) || 0) - (Number(a.height) || 0); });
    if (!candidates.length) throw new Error('Internet Archive: no MP4 file available');
    return candidates.slice(0, 4).map(function (f) {
      return { url: 'https://archive.org/download/' + encodeURIComponent(id) + '/' +
        f.name.split('/').map(encodeURIComponent).join('/'),
        quality: (f.height ? String(f.height) + 'p' : 'MP4'), container: 'mp4', kind: 'sub' };
    });
  });
}
