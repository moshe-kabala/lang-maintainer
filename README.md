

# Intrudaction
The package helps to collect distrbuted texts in a big project to translate them in only one file, reduce the duplicate text, mange text changes along the time, and deploy the translated result in the project

# Installation Guid
Install the script globaly by running
> npm i -g lang-maintainer


# Get Started
In the root of the project create config file "langconf.js"
and pass this content inside 
```
module.exports = {
    ignore: [] // put regex exp, by default the script ignore from node_modules 
}
```

And in your js or ts wrap labels object 
```
/**
 * @Translation
 */

const f = {
  field1: "some string sec 1 f 1",
  field2: "some string sec 1 f 2"
};

/**
 * @End_of_translation
 */
```


You can also adding json file (good for anther languages)
TBD



## Grouping
TBD

