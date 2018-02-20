/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has a url', function(){
          allFeeds.forEach(function(feed){
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed has a name', function(){
          allFeeds.forEach(function(feed){
            expect(feed.name).toBeDefined();
            expect(feed.name.length).not.toBe(0);
          });
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
 
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is initially hidden', function(){
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('toggles visible/hidden when the menu icon is clicked', function() {
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(false);
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });
   });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        it('feed 0 is defined with a name and url', function() {
            expect(allFeeds[0]).toBeDefined();
            expect(allFeeds[0].url).toBeDefined();
            expect(allFeeds[0].url.length).not.toBe(0);
            expect(allFeeds[0].name).toBeDefined();
            expect(allFeeds[0].name.length).not.toBe(0);
        });

        describe('feed 0 entries', function() {

            beforeAll(function(done) {
              loadFeed(0, function() {
                done();
              });
            });
    
            it('are loaded', function(){
              var numEntryLinks = $(".feed").children(".entry-link").length;
              expect(numEntryLinks).not.toBe(0);
            });
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var links0, links1;
        
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        it('feed 0 is defined with a name and url', function() {
            expect(allFeeds[0]).toBeDefined();
            expect(allFeeds[0].url).toBeDefined();
            expect(allFeeds[0].url.length).not.toBe(0);
            expect(allFeeds[0].name).toBeDefined();
            expect(allFeeds[0].name.length).not.toBe(0);
        });

        it('feed 1 is defined with a name and url', function() {
            expect(allFeeds[1]).toBeDefined();
            expect(allFeeds[1].url).toBeDefined();
            expect(allFeeds[1].url.length).not.toBe(0);
            expect(allFeeds[1].name).toBeDefined();
            expect(allFeeds[1].name.length).not.toBe(0);
        });

        describe('loading feed 0 followed by loading feed 1', function() {

            beforeAll(function(done) {
              links0 = [];
              links1 = [];
              loadFeed(0, function() {
                $(".feed").children(".entry-link").each(function() {
                  links0.push($(this).attr('href'));
                });
                loadFeed(1, function() {
                  $(".feed").children(".entry-link").each(function() {
                    links1.push($(this).attr('href'));
                  });
                  done();
                });
              });
            });
    
            it('changes feed content', function() {
              // log both link arrays here to verify beforeAll functionality
              // console.log('links0 = ', links0);
              // console.log('links1 = ', links1);
              expect(links1).not.toEqual(links0);
            });
        });
    });
}());

