<p align="center">
  <img src="https://user-images.githubusercontent.com/34594184/129216802-14dd2e61-2db8-4933-abc3-06fd0e139b82.png" />
</p>

# Moot Functions

Moot functions is a cog in the moot architecture that performs user matching.

## The moot story

Having matriculated during a pandemic, and with social interaction becoming increasingly scarce, our current batch faces a crucial challenge: meeting and connecting with fellow batchmates.

A core aspect of a university education is the opportunity to meet diverse individuals from multicultural backgrounds who offer new ideas and perspectives. However, with most students inundated with assignments and deadlines, it can be difficult to find the time to approach and talk to other students without fear of taking up too much of other peoples’ time. This often leads to a vicious cycle, where unless forced, no one finds the incentive to approach and talk to their peers. This effect, unfortunately, has only been compounded by the pandemic.

For most of us, almost an entire academic year has been spent not in the physical campus along with our fellow classmates, but within our own homes in solitude. We want to address the question of how we can emulate or even improve the intimacy and effectiveness of a real-life interaction but in a distributed, online setting.

Moot aims to expedite the process of social interaction and forming new connections, in an increasingly isolated world. We want to do this by matching individuals on the basis of common interest in deeper ideas/questions/themes as opposed to generic topic tags. To prevent distractions from the need to engage in small talk and make good first impressions, moot conversations are anonymous by default until users are comfortable enough to reveal their identities..

## Set up

1. Install a stable version of NodeJS. The active LTS or current version should work fine.
2. Clone this repository and navigate to it using "cd" in your command line or shell tool.
3. Run `npm install` in the `functions` folder to install dependencies.
5. Set up firebase cli and run `firebase deploy` to firebase functions

## Environment Set-up

```
export const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

```
The environment variables are firebase related and can be found in the firebase project settings. Since firebase doesn't support .env files, the variables (as above) go into a secrets.ts file in `functions/src.

## Testing

To run the tests after you made your modifications, run
`npm t` from the `functions` folder.
