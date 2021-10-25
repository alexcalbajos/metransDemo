# 1. Have you ever worked with Angular Material? What components did you used?
I worked almost exclusively with Angular Material ever since I started working with Angular (back on angular 4) so I've been through all the documentation and worked with all the components multiple times.


# 2. Do you use pipes? Do you know why they are used? Do you know some built in pipes? Did you ever created a custom one?
I use them almost every day - I used some for this project as well.
They are used to display some data in a transformed way.
Some of the built in pipes I use often are: currency, date, json...
I also created and used custom pipes, depending on the project needs.


# 3. How do you share data between components?
The most basic way of sharing data is through @Input and @Output:
  Parent to Child - @Input
  Child to Parent - @Output

There other ways also
  Interacting with components through @ViewChild / @ViewChildren
  Services that that hold state in some manner - Observables / BehaviorSubjects...


# 4. Do you know about ng-content, ng-container and ng-template? If yes, can you tell me an example where you could use them?
ng-content - can be used to create configurable components that accept dynamic content (content projection)
ng-container - can be used to remove unnecessary nesting in the DOM and also as the name suggest to group multiple elements under a single condition
ng-template - a template element that can be used with structural directives - for example in an if/else statement

I used ng-container and ng-template in this project as well


# 5. Do you have a project? Can you show us a project structure? How did you split the components, services or modules and why?
A usual structure I would use is something like this:

app                 <-- the root of the application
  components        <-- components that might be used at the root level (in app.component) only
  services          <-- root service - one instance per whole app
  models            <-- object models that can be used in the whole app
  enums             <-- enums that can be used in the whole app
  ng-modules        <-- angular modules - usually lazy loaded modules
    components      <-- components from an angular module
    services        <-- services used in an angular module
    ng-modules      <-- this structure can go as nested as it is needed
      components
      services

Check the ANSWERS_SCREENSHOT.png file for a real example.
