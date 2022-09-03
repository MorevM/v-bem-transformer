

### [1.1.2](https://github.com/MorevM/v-bem-transformer/compare/v1.1.1...v1.1.2) (2022-09-03)


### Chores

* Fix `unplugin` version to `0.7.2` since the following are broken ([45fddab](https://github.com/MorevM/v-bem-transformer/commit/45fddabd8697df472d87a5780fddfdde1a46d07f))

### [1.1.1](https://github.com/MorevM/v-bem-transformer/compare/v1.1.0...v1.1.1) (2022-09-03)


### Bug fixes

* **nuxt:** Correct composable import ([b031491](https://github.com/MorevM/v-bem-transformer/commit/b0314916c0d3c024191f7b674c2117c7efc38921))

## [1.1.0](https://github.com/MorevM/v-bem-transformer/compare/v1.0.4...v1.1.0) (2022-09-02)


### Features

* Add `useBemFactory` for usage with Composition API ([51f1bd2](https://github.com/MorevM/v-bem-transformer/commit/51f1bd2d154f2827d5cceafceebe2a639adc89af))
* **nuxt:** Add auto-imported composable to Nuxt 3 ([f9130e5](https://github.com/MorevM/v-bem-transformer/commit/f9130e5e4f92829f2fe2ce7db26bd17ce5973d7c))


### Tests

* Add test case with `<` character within tag ([5e18ed9](https://github.com/MorevM/v-bem-transformer/commit/5e18ed939fcefd54a75a48bfc415365ee2898600))


### Bug fixes

* Correctly parse `v-bem` if `<` character present ([442c3af](https://github.com/MorevM/v-bem-transformer/commit/442c3afaece8a632779d0f3621938df52973f7a3))


### Chores

* bump @morev/eslint-config from 15.2.0 to 15.3.0 ([#105](https://github.com/MorevM/v-bem-transformer/issues/105)) ([01ee16b](https://github.com/MorevM/v-bem-transformer/commit/01ee16b4cdc77926e4523badf445a7aeeed674b6))
* bump release-it from 15.2.0 to 15.3.0 ([#106](https://github.com/MorevM/v-bem-transformer/issues/106)) ([2f7ce9b](https://github.com/MorevM/v-bem-transformer/commit/2f7ce9bbbadf7facef7bdef08276d6741aa7b663))
* bump unbuild from 0.7.6 to 0.8.8 ([#104](https://github.com/MorevM/v-bem-transformer/issues/104)) ([2d7f2db](https://github.com/MorevM/v-bem-transformer/commit/2d7f2db58e8b7ae41334cc8ae84de7687030ffa1))
* bump unplugin from 0.8.0 to 0.9.0 ([#103](https://github.com/MorevM/v-bem-transformer/issues/103)) ([d4f4c82](https://github.com/MorevM/v-bem-transformer/commit/d4f4c8207d1bc38066e2e4e6ef7b28ce5e5781f9))
* Set `@nuxt/kit` version rc.8 ([b0aa114](https://github.com/MorevM/v-bem-transformer/commit/b0aa114df33b51c5de1e01dc5a5adb34a4db2ddb))
* Upgrade deps ([1b16c7d](https://github.com/MorevM/v-bem-transformer/commit/1b16c7db89e245e3c5673b92d4ec79706248ac5a))

### [1.0.4](https://github.com/MorevM/v-bem-transformer/compare/v1.0.3...v1.0.4) (2022-08-01)


### Chores

* bump eslint from 8.20.0 to 8.21.0 ([8e59a68](https://github.com/MorevM/v-bem-transformer/commit/8e59a68a2a77953bc825215f147ec7bc32000e78))


### Bug fixes

* Revert RegExp change since it doesn't respect components nesting ([3cbb488](https://github.com/MorevM/v-bem-transformer/commit/3cbb4884169e7df2a8e136de45ef863c2e38cba9))


### Tests

* Add nested components test ([3467655](https://github.com/MorevM/v-bem-transformer/commit/34676552bc02f521c677dea4b0bd3a4a600a2f68))

### [1.0.3](https://github.com/MorevM/v-bem-transformer/compare/v1.0.2...v1.0.3) (2022-08-01)


### Bug fixes

* Correct imports after `@morev/helpers` update ([4c06c33](https://github.com/MorevM/v-bem-transformer/commit/4c06c3314051f3bbd872ce29dd45d06bbac01ef5))

### [1.0.2](https://github.com/MorevM/v-bem-transformer/compare/v1.0.1...v1.0.2) (2022-07-31)


### Chores

* bump @morev/helpers from 0.19.2 to 0.20.0 ([#73](https://github.com/MorevM/v-bem-transformer/issues/73)) ([a1d8297](https://github.com/MorevM/v-bem-transformer/commit/a1d829743e95b35b9470cd736ea7a44725de9ce6))
* bump @types/jest from 28.1.1 to 28.1.2 ([#74](https://github.com/MorevM/v-bem-transformer/issues/74)) ([263fb14](https://github.com/MorevM/v-bem-transformer/commit/263fb14ba9a10be555a27bbf132ce7455f95f4e1))
* bump eslint from 8.17.0 to 8.18.0 ([#76](https://github.com/MorevM/v-bem-transformer/issues/76)) ([fee9d20](https://github.com/MorevM/v-bem-transformer/commit/fee9d207224114e8186687941b2f09c8cf830d78))
* bump lint-staged from 13.0.1 to 13.0.2 ([#75](https://github.com/MorevM/v-bem-transformer/issues/75)) ([30e0ce8](https://github.com/MorevM/v-bem-transformer/commit/30e0ce80ab52672041db2cef1c12afe4e0409e88))
* Deps update ([97c2614](https://github.com/MorevM/v-bem-transformer/commit/97c2614775cf9973f3f6a381a4d813b47af5b201))


### Bug fixes

* Fix RegExp to cover case with `>` character within element tag ([42a4496](https://github.com/MorevM/v-bem-transformer/commit/42a4496cb0a354929894c348217f3825b3f686ca))


### Tests

* Add test case with `>` character within element declaration ([ac2dfa2](https://github.com/MorevM/v-bem-transformer/commit/ac2dfa235cde0c0a7b720f108f6a96db784ecf45))

### [1.0.1](https://github.com/MorevM/v-bem-transformer/compare/v1.0.0...v1.0.1) (2022-06-11)


### Chores

* bump @morev/eslint-config from 10.0.3 to 11.1.0 ([#34](https://github.com/MorevM/v-bem-transformer/issues/34)) ([360f0fb](https://github.com/MorevM/v-bem-transformer/commit/360f0fb104e379b7c6852a10e7536ddece15beb7))
* bump @morev/eslint-config from 11.1.0 to 11.1.1 ([#41](https://github.com/MorevM/v-bem-transformer/issues/41)) ([98322a4](https://github.com/MorevM/v-bem-transformer/commit/98322a4d38b988cc690225edd71e3b31c2f05754))
* bump @morev/eslint-config from 11.1.1 to 11.1.2 ([#42](https://github.com/MorevM/v-bem-transformer/issues/42)) ([5033aea](https://github.com/MorevM/v-bem-transformer/commit/5033aea4b1433e727d089f4bcc589dbfc4a655a8))
* bump @morev/helpers from 0.14.1 to 0.15.0 ([#43](https://github.com/MorevM/v-bem-transformer/issues/43)) ([820afb5](https://github.com/MorevM/v-bem-transformer/commit/820afb57d17ec14d0775a7587a3c0bfb69919f84))
* bump @morev/helpers from 0.9.0 to 0.14.1 ([#40](https://github.com/MorevM/v-bem-transformer/issues/40)) ([06a0077](https://github.com/MorevM/v-bem-transformer/commit/06a0077259cb6663ed68f8935d9f94c61d14d828))
* bump @release-it/conventional-changelog from 4.2.2 to 4.3.0 ([#36](https://github.com/MorevM/v-bem-transformer/issues/36)) ([0558113](https://github.com/MorevM/v-bem-transformer/commit/05581133caf56b17d5d41fde05f9d06929564238))
* bump eslint from 8.12.0 to 8.13.0 ([#33](https://github.com/MorevM/v-bem-transformer/issues/33)) ([aeaecf1](https://github.com/MorevM/v-bem-transformer/commit/aeaecf1c0d8a2c3122eebcae8e4dee740e44bb03))
* bump eslint from 8.13.0 to 8.14.0 ([#44](https://github.com/MorevM/v-bem-transformer/issues/44)) ([92142c7](https://github.com/MorevM/v-bem-transformer/commit/92142c748a72c41bc9513e98905c4c1fec015352))
* bump eslint from 8.14.0 to 8.17.0 ([#65](https://github.com/MorevM/v-bem-transformer/issues/65)) ([9dff564](https://github.com/MorevM/v-bem-transformer/commit/9dff564a0321502b8ef22fe814e4fe9b60df16a3))
* bump husky from 7.0.4 to 8.0.1 ([#55](https://github.com/MorevM/v-bem-transformer/issues/55)) ([26fe82d](https://github.com/MorevM/v-bem-transformer/commit/26fe82d64d7a4dc4c9ad81042e8fecfbb8e64443))
* bump lint-staged from 12.3.7 to 12.3.8 ([#39](https://github.com/MorevM/v-bem-transformer/issues/39)) ([96e6674](https://github.com/MorevM/v-bem-transformer/commit/96e66741a0c1690fe22be2c69c4a1d87b4a42878))
* bump lint-staged from 12.3.8 to 12.4.0 ([#45](https://github.com/MorevM/v-bem-transformer/issues/45)) ([1d6a687](https://github.com/MorevM/v-bem-transformer/commit/1d6a687c41e921bb74d3cd65df463076c54589d5))
* bump lint-staged from 12.4.0 to 12.4.1 ([#50](https://github.com/MorevM/v-bem-transformer/issues/50)) ([f439eab](https://github.com/MorevM/v-bem-transformer/commit/f439eab39d7d35f716678b5857e2573be258bce6))
* bump release-it from 14.14.0 to 14.14.2 ([#35](https://github.com/MorevM/v-bem-transformer/issues/35)) ([1d7f700](https://github.com/MorevM/v-bem-transformer/commit/1d7f700e13e7677e57c0ab0d786c43ac5cb4d931))
* bump release-it from 14.14.2 to 14.14.3 ([#47](https://github.com/MorevM/v-bem-transformer/issues/47)) ([812f1bb](https://github.com/MorevM/v-bem-transformer/commit/812f1bb4a3aaedc99f8912b59580b26d7037a0fb))
* bump unbuild from 0.7.2 to 0.7.4 ([#37](https://github.com/MorevM/v-bem-transformer/issues/37)) ([e6d53ab](https://github.com/MorevM/v-bem-transformer/commit/e6d53ab8c37099f3edcd17a866168cf8a22f111a))
* bump unplugin from 0.6.1 to 0.6.2 ([#38](https://github.com/MorevM/v-bem-transformer/issues/38)) ([ef27119](https://github.com/MorevM/v-bem-transformer/commit/ef271196ea489828a5c8f6b4043dec7951d810a0))
* bump unplugin from 0.6.2 to 0.7.0 ([#70](https://github.com/MorevM/v-bem-transformer/issues/70)) ([2038cfc](https://github.com/MorevM/v-bem-transformer/commit/2038cfc54e0c6762e8dc9723f82d768174804cfd))
* Deps update ([f45c5fa](https://github.com/MorevM/v-bem-transformer/commit/f45c5fabbca764e9b5010e5b133d2e62101d06f4))

## [1.0.0](https://github.com/MorevM/v-bem-transformer/compare/v0.0.5...v1.0.0) (2022-04-09)


### ⚠ BREAKING CHANGES

* Build mechanics have changed significantly with the introduction of new builder and `@nuxt/kit`.
Although there shouldn't be any problems, the update is marked as a major to avoid embarrassment.

### Features

* Add universal nuxt mapping using `@nuxt/kit` ([3b6ea6e](https://github.com/MorevM/v-bem-transformer/commit/3b6ea6e6ca47f2dfda7eb6b8a2fea03c21574ec1))


### Bug fixes

* Correct defaults ([ea23f01](https://github.com/MorevM/v-bem-transformer/commit/ea23f01a53ebadf51a08feef2c61dd23c2725dd5))


### Chores

* bump @morev/commitlint-config from 0.1.0 to 0.1.1 ([#27](https://github.com/MorevM/v-bem-transformer/issues/27)) ([a2d239b](https://github.com/MorevM/v-bem-transformer/commit/a2d239b80742c3ed73932b2144dba860775c8be8))
* bump @morev/eslint-config from 8.2.0 to 10.0.3 ([#28](https://github.com/MorevM/v-bem-transformer/issues/28)) ([ae3a015](https://github.com/MorevM/v-bem-transformer/commit/ae3a0158b2302decd4c3af87cdf7ad6c779ba9f3))
* bump @rollup/plugin-commonjs from 21.0.2 to 21.0.3 ([#31](https://github.com/MorevM/v-bem-transformer/issues/31)) ([ee9cec6](https://github.com/MorevM/v-bem-transformer/commit/ee9cec69ff4f5e9efb39e09629fb47dc3b84b58d))
* bump release-it from 14.13.1 to 14.14.0 ([#30](https://github.com/MorevM/v-bem-transformer/issues/30)) ([f2a8360](https://github.com/MorevM/v-bem-transformer/commit/f2a836094724f9abf7c040fb19c55f38d9092ec2))
* bump unplugin from 0.6.0 to 0.6.1 ([#29](https://github.com/MorevM/v-bem-transformer/issues/29)) ([c1f159e](https://github.com/MorevM/v-bem-transformer/commit/c1f159ebd9d2b71b5912f9927a1eff9daaed814e))
* Migrate to `unbuild` ([c53279d](https://github.com/MorevM/v-bem-transformer/commit/c53279dd962d6007480344ff3780f15a3f17c33d))### [0.0.5](https://github.com/MorevM/v-bem-transformer/compare/v0.0.4...v0.0.5) (2022-03-26)


### Chores

* bump @morev/eslint-config from 8.1.0 to 8.2.0 ([#19](https://github.com/MorevM/v-bem-transformer/issues/19)) ([1868146](https://github.com/MorevM/v-bem-transformer/commit/1868146192eab2d82f3e1efa28bf415e5ed866c5))
* bump eslint from 8.11.0 to 8.12.0 ([#25](https://github.com/MorevM/v-bem-transformer/issues/25)) ([e7bff08](https://github.com/MorevM/v-bem-transformer/commit/e7bff08e6a46e57508a163a8981303f3b5d2d839))
* bump lint-staged from 12.3.5 to 12.3.7 ([#22](https://github.com/MorevM/v-bem-transformer/issues/22)) ([800aeba](https://github.com/MorevM/v-bem-transformer/commit/800aebaf80f7efa186ef417b710f2aeef36ef1f7))
* bump release-it from 14.12.5 to 14.13.1 ([#24](https://github.com/MorevM/v-bem-transformer/issues/24)) ([140d8d0](https://github.com/MorevM/v-bem-transformer/commit/140d8d0a0c103e63b5c330dc45471f1923ad75f8))
* bump rollup from 2.70.0 to 2.70.1 ([#20](https://github.com/MorevM/v-bem-transformer/issues/20)) ([77a38cb](https://github.com/MorevM/v-bem-transformer/commit/77a38cba8463121dcde9f1d8b42f8f34d51944d3))
* bump unplugin from 0.4.0 to 0.5.2 ([#21](https://github.com/MorevM/v-bem-transformer/issues/21)) ([278e917](https://github.com/MorevM/v-bem-transformer/commit/278e917dbc00f6b91122a250ce822721c8ca2f13))
* bump unplugin from 0.5.2 to 0.6.0 ([#23](https://github.com/MorevM/v-bem-transformer/issues/23)) ([4fd9436](https://github.com/MorevM/v-bem-transformer/commit/4fd94366584472f8c4909823aa8a1028daf3f033))
* Update dependabot settings ([867c4c1](https://github.com/MorevM/v-bem-transformer/commit/867c4c18505cfdab794c99eea6446290901306b8))### [0.0.4](https://github.com/MorevM/v-bem-transformer/compare/v0.0.3...v0.0.4) (2022-03-12)


### Bug fixes

* Parser failure for conditions containing `>` character ([f755477](https://github.com/MorevM/v-bem-transformer/commit/f7554776272509daf442d8cd7cf3df31c3b3c342))


### Chores

* bump @morev/eslint-config from 6.0.2 to 8.0.2 ([#12](https://github.com/MorevM/v-bem-transformer/issues/12)) ([b52cb11](https://github.com/MorevM/v-bem-transformer/commit/b52cb11a3eef8fdd9c7d00fd0dd5f2445e23ef23))
* bump @release-it/conventional-changelog from 4.1.0 to 4.2.0 ([#8](https://github.com/MorevM/v-bem-transformer/issues/8)) ([636eba9](https://github.com/MorevM/v-bem-transformer/commit/636eba95a001d69d3358434a52061040c118c89b))
* bump @release-it/conventional-changelog from 4.2.0 to 4.2.2 ([#15](https://github.com/MorevM/v-bem-transformer/issues/15)) ([3b5a392](https://github.com/MorevM/v-bem-transformer/commit/3b5a39214999ad346652e27f16ea292f154339d8))
* bump eslint from 8.10.0 to 8.11.0 ([#17](https://github.com/MorevM/v-bem-transformer/issues/17)) ([c87dde4](https://github.com/MorevM/v-bem-transformer/commit/c87dde401dcd16d6179383a887207990b8e5a5d0))
* bump eslint from 8.9.0 to 8.10.0 ([#9](https://github.com/MorevM/v-bem-transformer/issues/9)) ([10de929](https://github.com/MorevM/v-bem-transformer/commit/10de929353d3c91842f5f46385ac10bccc59df8e))
* bump lint-staged from 12.3.4 to 12.3.5 ([#10](https://github.com/MorevM/v-bem-transformer/issues/10)) ([c10bbe2](https://github.com/MorevM/v-bem-transformer/commit/c10bbe244224e35784477c4a04d4c0cf0ddca696))
* bump rollup from 2.68.0 to 2.69.1 ([#13](https://github.com/MorevM/v-bem-transformer/issues/13)) ([538ce22](https://github.com/MorevM/v-bem-transformer/commit/538ce22e7d45a79a7e2739b6ab3823fc7bb16a51))
* bump rollup from 2.69.1 to 2.70.0 ([#14](https://github.com/MorevM/v-bem-transformer/issues/14)) ([d552aa9](https://github.com/MorevM/v-bem-transformer/commit/d552aa9cc9fe4238198edfd179c26961c02b6d4d))
* bump unplugin from 0.3.2 to 0.3.3 ([#11](https://github.com/MorevM/v-bem-transformer/issues/11)) ([63a3bdd](https://github.com/MorevM/v-bem-transformer/commit/63a3bdd89a599eed38848c36a7f5d65502e2ecde))
* bump unplugin from 0.3.3 to 0.4.0 ([#18](https://github.com/MorevM/v-bem-transformer/issues/18)) ([a297645](https://github.com/MorevM/v-bem-transformer/commit/a2976454ec3ebdb80c877abba390753a0f8101c4))
* **release-it:** Upgrade `release-it` config ([364e307](https://github.com/MorevM/v-bem-transformer/commit/364e30754c0dca35fbd3502601a71391f5c95b2f))
* Upgrade dependencies ([46fc7e1](https://github.com/MorevM/v-bem-transformer/commit/46fc7e1c5655a992f42c582b93824262cedcb8bf))


### Tests

* Add case with condition containing `>` char ([fe75266](https://github.com/MorevM/v-bem-transformer/commit/fe75266cae49351011698ba5f3f3def42249807e))## [0.0.3](https://github.com/MorevM/v-bem-transformer/compare/v0.0.2...v0.0.3) (2022-02-23)


### Bug Fixes

* Change package name in `README.md` ([bc496f7](https://github.com/MorevM/v-bem-transformer/commit/bc496f79252084c86206299ef49dbb7854bb0c92))

## 0.0.2 (2022-02-06)