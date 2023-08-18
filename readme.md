# TTS

TTS is a project to create automated live Reddit feeds. The internet is already plagued with random videos of automated bots generating Reddit content, but I want to turn it into a 24/7 livestream. Whether it be text-to-speech stories, comment chains, or video compilations I personally enjoy watching this form of content, so having my computer create it for me to view whenever sounds great to me!

## Configuration

To setup the site, you first need to create a Reddit script application. This will provide you with a client ID and secret. Using these, you need to create a `secrets.json` file containing the following:

```json
{
  "userAgent": "your user agent",
  "clientId": "your client id",
  "clientSecret": "your client secret",
  "username": "your username",
  "password": "your password"
}
```
