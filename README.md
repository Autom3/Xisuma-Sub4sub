# Sub4Sub

This bot allows users to promote their own content in a seperate channel with timeouts (default 24h).

### Usage:

```
:selfpromo <link>
```

Sends a message in a designated channel specified in the

### Installation

Create a new file: `.env`

Open `.env` and add in the following parameters (same as in .env.example):

```
DISCORD_BOT_ACCESS_TOKEN=
PREFIX=
USER_COOLDOWN=
CHANNEL_ID=
```

Fill in each with the appropriate information. `USER_COOLDOWN` is calculated in minutes.

Then run the following commands:

```
npm run build
npm start
```

Questions or pull-requests are welcome.
