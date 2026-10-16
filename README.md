# Zangetsu Community Sources

A community-maintained catalogue of legal, public media sources for Zangetsu-compatible provider integrations.

## Repository status
This is a starter catalogue. Provider availability and compatibility can change; verify each source before relying on it. Only add sources that provide content lawfully and respect their terms.

## Manifest
Raw manifest URL:
https://raw.githubusercontent.com/Navneet-apple/zangetsu-community-sources/main/index.json

## Hosting your own repository
1. Fork this repository or create a public GitHub repository.
2. Add an `index.json` manifest at the repository root.
3. Put provider scripts in a directory such as `providers/`.
4. Ensure every manifest path points to a file committed to the same branch.
5. Open each raw file URL in a browser to verify it returns file contents, not a 404 or HTML page.
6. In Zangetsu, add the raw manifest URL if your installed version supports custom repository manifests.
7. Test providers individually and remove broken or unmaintained entries.

## Contributing
Submit a pull request with the provider name, upstream project, supported content types, licence/terms information, and reproducible tests. Do not submit credentials, paid-content bypasses, or links to unauthorized copies.

## Disclaimer
Independent community project, not affiliated with Zangetsu. No guarantee that any provider works, remains online, or is supported by every Zangetsu version.

## Compatible Zangetsu provider repositories

These are separate Zangetsu JavaScript provider repositories. Add their **manifest URLs** in Zangetsu under **Settings → Sources → Add repo**; they are not CloudStream or Aniyomi manifests.

- **Official/default Zangetsu community provider collection:** https://raw.githubusercontent.com/Spyou/zangetsu-providers/main/index.json
  - Includes AniKoto, HiAnime, AnimeCube and several movie/series providers.
- **Additional Zangetsu providers by Spyou:** https://raw.githubusercontent.com/Spyou/Zangetsu-spyou-provider/main/index.json
  - Includes AnimeLok, AnimeSalt, AnimixStream, AnimeDrive and NetPrime.

These upstream repositories are maintained separately and can change independently of this project. We link to them rather than copying their provider code into this repository without a clear redistribution licence and source-by-source review. Availability and playback are not guaranteed.

## Other extension ecosystems

CloudStream, Aniyomi, Mihon and LNReader repository manifests are **not interchangeable** with Zangetsu JavaScript manifests. Their extensions need a compatible adapter or a port to Zangetsu's provider API; adding those manifest URLs to this repo's `index.json` will not make their extensions work.

