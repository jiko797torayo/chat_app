## Application name
chat_app

## Overview
ReactとRailsを使用したチャットアプリです。

## Development environment
* ruby  2.3.1
* rails 4.2.8

## Database
* mysql2 0.3.21

## Set up
* 当リポジトリをクローン
<br>
```
$ git clone -b https://github.com/jiko797torayo/chat_app.git
```
* アプリケーションのセットアップ
<br>
```
$ bundle install
```
<br>

```
$ npm install
```
* データベースのセットアップ
<br>
```
$ bundle exec rake db:create
```
<br>

```
$ bundle exec rake db:migrate
```
<br>

```
$ bundle exec rake db:seed
```
* サーバーを起動
<br>
```
$ rails s
```
