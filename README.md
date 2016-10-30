# Volunteer Meetup
![Build Status](https://codeship.com/projects/89e15750-75d7-0134-cb26-02a0cff8dcbf/status?branch=master)
![Code Climate](https://codeclimate.com/github/fjlanasa/volunteer-meetup.png)
![Coverage Status](https://coveralls.io/repos/fjlanasa/volunteer-meetup/badge.png)

Demo Site: http://volunteer-meetup.herokuapp.com

### About

Volunteer Meetup is an app meant help communities recover after major flooding events. Authenticated users can:
* Create and delete requests for cleaning up a home
* Create, edit, delete teams to respond to requests for help
* Join volunteer teams, leave volunteer teams, and edit their contribution to a team
* Search for potential volunteer sites, filtered by preferred driving distance
* Communicate with team members on live-updating message boards

This is a single-page application using a PostreSQL database and Rails API on the back-end and a React front-end, integrating React Router to make site navigation more intuitive. The Google Maps API was employed to allow autocompletion of location-based form fields, interactive maps, and to calculate the distances between volunteers and potential sites. Foundation and CSS media queries were used to optimize display for mobile devices as well as desktop screens.


### Why Did I Build Volunteer Meetup?

I lost my home to flooding during Hurricane Katrina, and many of my friends and family in the Baton Rouge area lost their homes to flooding in the summer of 2016. In both cases, local volunteers provided incredible support both in the rescue and recovery process. I wanted to build this app to help ease the logistical burden of organizing volunteers so they can focus on their work.

### Download
```
git clone https://github.com/fjlanasa/volunteer-meetup.git
cd volunteer-meetup
bundle install
rake db:create
rake db:migrate
npm install
npm start
```
(In a seperate tab: `rails s` to start the server)

You will need to create a `.env` file in the root directory of the project, including a line setting your Google Maps API key, like so:

```
GOOGLE_MAPS_KEY=[YOUR GOOGLE MAPS API KEY]
