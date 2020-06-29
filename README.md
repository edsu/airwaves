# Airwaves

This repository contains a static web application that was developed as part of
the [Unlocking the Airwaves] project. You can find the production deployment of
this website at:

https://mith.umd.edu/airwaves/

*airwaves* is built using [Gatsby] which is a static website
generator written in [NodeJS]. Even though the *airwaves* website is deployed
as a set of static files to MITH's webserver, it relies on several other
services during its *build* and *runtime*. The *build* is a process that happens once when the site is deployed, and the *runtime* is the process run by your browser when you access the airwaves website. These services include:

* [GitHub]: probably the site you are looking at now in your browser, and where the source code for the website is stored and versioned (*build*)
* [Airtable]: a web accessible database where the audio and document metadata are curated. (*build*)
* [Internet Archive]: document digitization processes [upload] page scans to the Internet Archive which are made available through their [IIIF Service]. (*build* + *runtime*)
* [Amazon S3]: MP3 audio files and WebVTT transcripts of radio episodes are stored in an Amazon S3 bucket. (*runtime*)
* [Netlify]: provides a service that watches the airwaves GitHub repositry and automatically builds a [staging site] distinct from our production site, which is used for development and testing. (*build*)

Static websites are useful for sustainability since they require very little in
terms of maintenance and monitoring. But this sustainability is achieved by
pushing some of the complexity of a dynamic website into the static website's build
process. Fortunately, this build process happens just once when the site is
deployed, rather than every time a resource is fetched by a user. The remainder
of this documentation is concerned with how to build and deploy the site.

## 1. NodeJS

*airwaves* is built with [Gatsby] which requires a [NodeJS] development
environment. If you already have NodeJS setup on your computer you can jump
forward to the section [2. GitHub Account](#2-github-account). Otherwise here
are some operating system specific instructions for getting NodeJS on your
computer.

### OS X

1. Install [XCode] or alternatively just the XCode Command Line Tools
2. Install [Homebrew]
3. Open Terminal window and type: `brew install node`

### Windows

Installing NodeJS on Windows isn't difficult, but Gatsby requires a working
C++ compiler which isn't the easiest thing to get set up on Windows.
Fortunately Windows 10 includes the [Windows Subsystem for Linux] which lets
you easily run an Ubuntu Linux system on Windows.

1. Ensure your Windows 10 software is up to date and at least on Version 2004
1. Install [WSL 2.0]
2. Open the Microsoft Store App and install [Ubuntu 20.04 LTS]
3. Start Ubuntu 20.04
4. Pick a username and password for your new Ubuntu operating system

Now you are ready to follow the installation instructions below for Linux.

### Linux (Ubuntu)

First make sure the operating system is up to date:

    sudo apt-get update
    sudo apt-get upgrade

Next you will need to tell Ubuntu to install the latest version of NodeJS:

    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs npm

## 2. GitHub Account

In order to push changes back to GitHub you will need a GitHub account that
has been granted access to the airwaves repository.

1. Create a GitHub account.
2. Ask a project member to add you to the airwaves GitHub repository.

Next you will need to generate your public key so you can talk to the GitHub
server. First see if you have a key already:

    cat ~/.ssh/id_rsa.pub

If you see a file not found message you will need to generate your key:

    ssh-keygen

Accept all the defaults when running ssh-keygen. Afterward you should see your
key displayed when you:

    cat ~/.ssh/id_rsa.pub

Go to GitHub and [add your ssh key] by copy and pasting the text into the web
form.

As a last step you need to tell the git command line utility who you are on GitHub. Run the following command in your terminal after substituting the email address you used to sign up for GitHub:

    git config --global user.email ehs@pobox.com

Whew, that was a lot! But fortunately you'll only need to do these steps once
on the computer you are using.

## 3. Build

Now you should be able to fetch the code to your workstation from GitHub:

    git clone https://github.com/umd-mith/airwaves
    cd airwaves

In order to collect data from the Airtable database you will need to set a
configuration variable using a key which one of the team members can give you.
Replace PUT_THE_KEY_HERE with the key that they give you in the command below:

    echo "AIRTABLE_API_KEY=PUT_KEY_HERE" > .env

## 4. Install Dependencies

The first time you build the site you will need to install the libraries that
the site depends on:

    npm install

It can't hurt to run this command occasionally in the future in case someone adds new dependencies to the *package.json*.

## 5. Development Server

Usually whey you are developing the site you will want to run a development
server to see what the application looks like as you make changes to the source code:

    npm run start
    open http://localhost:8000

## 6. Refreshing the Data

The GitHub repository contains snapshots of the Airtable and Internet Archive
data. If you would like to get the latest data from these sources and regenerate
the search index, you will need to run the following commands:

    npm run fetch-data
    npm run index

These can take some time to run, especially the first time, since it involves downloading all the document OCR from the Internet Archive so that it can be indexed.

It is not required at all but if you want to reload only portions of the data you can execute parts of the data fetching separately. So to download only the latest authority data you can:

    npm run fetch-authorities

If you want to only download the latest episode metadata you can:

    npm run fetch-episodes

If you'd like to fetch the latest document metadata without checking for OCR data at the Internet Archive (which takes time) you can run:

    npm run fetch-docs -- skip-ocr

## 7. Deploy to Staging

In order to deploy to the staging site at [unlocking.netlify.app] you will need to *commit* and *push* your changes back to GitHub. The first step in this process is to make your commit with a message indicating what has been changed:

    git commit -a -m 'Describe what you are changing here.'

This will commit *all* changed files, so you may want to be careful. If you'd like to see what changes are going to be committed you can review them with:

    git status

Once you have committed your changes locally you can push them up to GitHub:

    git push origin master

If successful your push will trigger a build process to kick off at Netlify, and
after a few minutes you should see your changes reflected at the staging site: unlocking.netlify.app.

## 8. Deploy to Production

The website is currently published on the MITH website at
https://mith.umd.edu/airwaves In order to publish there your SSH pubkey
(which you created above) needs to be added to the
`/home/ubuntu/.ssh/authorized_keys` file on wordpress.mith.us server. Email
your public key to edsu@umd.edu and he will do that for you if you don't have permission to do it yourself.

Once your key is set up you will want to ensure you have the latest code on
GitHub:

    git pull 

And then you can publish to mith.umd.edu:

    npm run publish

This command will build the site and then use the rsync command to push the new
files up to the MITH webserver. You may need to wait for the Varnish cache to
expire for your changes to become available.

## 9. Exhibit Creation with Netlify

Finally there are administration forms available on the staging site that
allow for the creation of exhibits. You can find these at
https://unlocking.netlify.app/admin/ In order to use these forms you will
need to be added to MITH's Netlify account. Please email edsu@umd.edu to
request access.

When exhibits are saved here they should be viewable on the staging site at
airwaves.netlify.app once the build has completed. In order to publish these
changes to the 

[Unlocking the Airwaves]: https://mith.umd.edu/research/unlocking-the-airwaves/

[NAEB]: https://en.wikipedia.org/wiki/National_Association_of_Educational_Broadcasters 

[Gatsby]: https://www.gatsbyjs.org/

[Internet Archive]: https://archive.org/search.php?query=creator%3A%22National+Association+of+Educational+Broadcasters%22

[Netlify]: https://www.netlify.com

[NodeJS]: https://nodejs.org

[Windows Subsystem for Linux]: https://docs.microsoft.com/en-us/windows/wsl/install-win10

[upload]: https://github.com/umd-mith/airwaves-cli/

[IIIF Service]: https://iiif.archivelab.org/iiif/documentation

[staging site]: https://unlocking.netlify.app

[WSL 2.0]: https://docs.microsoft.com/en-us/windows/wsl/install-win10  

[GitHub]: https://github.com/umd-mith/airwaves

[Airtable]: https://airtable.com/

[Amazon S3]: https://aws.amazon.com/s3/

[XCode]: https://developer.apple.com/xcode/

[Homebrew]: https://brew.sh

[Ubuntu 20.04 LTS]: https://www.microsoft.com/en-us/p/ubuntu-2004-lts/9n6svws3rx71

[add your ssh key]: https://help.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account

[unlocking.netlify.app]: https://unlocking.netlify.app
