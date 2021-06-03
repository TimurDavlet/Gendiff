# Gendiff (генератор различий) - программа, которая определяет разницу между двумя структурами данных.

[![Node CI](https://github.com/TimurDavlet/frontend-project-lvl-2/actions/workflows/main.yml/badge.svg)](https://github.com/TimurDavlet/frontend-project-lvl-2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/3ee67d28ca49c0bed362/maintainability)](https://codeclimate.com/github/TimurDavlet/frontend-project-lvl-2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3ee67d28ca49c0bed362/test_coverage)](https://codeclimate.com/github/TimurDavlet/frontend-project-lvl-2/test_coverage)

Возможности утилиты:

- Поддержка разных форматов ввода: yaml, json
- Формирование отчета в plain, stylish и json формате

### Требования:
Gendiff requires Node.js v14.6.0+ to run.

### Для систем Linux / macOS

### Для установки программы просто запустите внутри клонированной папки:

`$ make install`

Удалить программу:

`$ make uninstall`

Получить справочную информацию:

`$ gendiff -h`

Сравните два файла:

`$ gendiff pathToFile1.json pathToFile2.json`

Сравните два файла, используя другие форматы:
```
$ gendiff -f простой pathToFile1.json pathToFile2.json
$ gendiff -f json pathToFile1.json pathToFile2.json
```
Запустить тесты:

`$make test`

[![asciicast](https://asciinema.org/a/4AliJuWxkPIVMgEJjbu3Gym2U.svg)](https://asciinema.org/a/4AliJuWxkPIVMgEJjbu3Gym2U)
