# express-tutorial
Express + PrismaでAPIを構築するためのサンプルリポジトリ

## 構成
- バックエンドFW: Express (TypeScript)
- ORM: Prisma
- データベース: MySQL

## 環境構築
DBコンテナを起動する。

```
docker-compose up -d
```

.envを.env.sampleから複製して作成する。

```
cp .env.sample .env
```

.envにDBコンテナに接続するためのURLを設定する。
URL形式の詳細は[こちら](https://www.prisma.io/docs/orm/overview/databases/mysql#connection-url)を参照。

```
DATABASE_URL="mysql://ユーザー名:パスワード@localhost:3306/testdb?schema=public"
```

Prisma CLIを使って、DBにスキーマ定義をマイグレーションする。

```
npx prisma migrate dev --name init
```

## 開発時の留意点
- schema.prismaを変更した際は、`prisma migrate dev`または`prisma db push`でDBに反映させるようにする。
  - 上記コマンドを実行すると、Prisma Clientの情報をスキーマに合わせて更新する`prisma generate`も一緒に実行してくれる

## 参考
[Start from scratch with Prisma ORM using TypeScript and PostgreSQL \(15 min\) \| Prisma Documentation](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)

[CRUD \(Reference\) \| Prisma Documentation](https://www.prisma.io/docs/orm/prisma-client/queries/crud)