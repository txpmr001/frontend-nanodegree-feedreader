/* feedreader.js
 *
 * This is the spec file that Jasmine reads. It contains
 * all of the tests to be run against the application.
 */

/* Place all tests within the $() function to ensure that tests
 * requiring DOM elements don't run until the DOM is ready.
 */
$(function() {
    /* Check the the RSS feed definitions and the allFeeds variable.
    */
    describe('RSS Feeds', function() {

        /* Test to ensure that the allFeeds variable has been defined
         * and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loop through each feed in the allFeeds object and ensure
         * that it has a URL defined and that the URL is not empty.
         */
        it('each feed has a url', function(){
          allFeeds.forEach(function(feed){
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          });
        });

        /* Loop through each feed in the allFeeds object and ensure
         * that it has a name defined and that the name is not empty.
         */
        it('each feed has a name', function(){
          allFeeds.forEach(function(feed){
            expect(feed.name).toBeDefined();
            expect(feed.name.length).not.toBe(0);
          });
        });
    });

    /* Check menu functionality.
     */
    describe('The menu', function() {
 
        /* Test to ensure that the menu element is hidden by default.
         * Class 'menu-hidden' is used to hide the menu.
         */
        it('is initially hidden', function(){
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Test to ensure that the menu changes visibility when
         * the menu icon is clicked.
         */
        it('toggles visible/hidden when the menu icon is clicked', function() {
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(false);
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });
   });

    /* Check that entries are being loaded.
     */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        /* Test to ensure that feed 0 is fully defined before loading
         * with the beforeEach function.
         */
        it('feed 0 is defined with a name and url', function() {
            expect(allFeeds[0]).toBeDefined();
            expect(allFeeds[0].url).toBeDefined();
            expect(allFeeds[0].url.length).not.toBe(0);
            expect(allFeeds[0].name).toBeDefined();
            expect(allFeeds[0].name.length).not.toBe(0);
        });

        /* Nest feed 0 entry tests to ensure that loadFeed does not attempt
         * to load an undefined feed.
         */
        describe('feed 0 entries', function() {

            /* Load feed 0 asynchronously before checking for entries.
             */
            beforeEach(function(done) {
              loadFeed(0, function() {
                done();
              });
            });
    
            /* Test to ensure that loadFeed created entries.
             */
            it('are loaded', function(){
              var numEntryLinks = $(".feed .entry-link").length;
              expect(numEntryLinks).not.toBe(0);
            });
        });
    });

    /* Check feed selection functionality.
     */
    describe('New Feed Selection', function() {
        var links0, links1;
        
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        /* Test to ensure that feed 0 is fully defined before loading
         * with the beforeEach function.
         */
        it('feed 0 is defined with a name and url', function() {
            expect(allFeeds[0]).toBeDefined();
            expect(allFeeds[0].url).toBeDefined();
            expect(allFeeds[0].url.length).not.toBe(0);
            expect(allFeeds[0].name).toBeDefined();
            expect(allFeeds[0].name.length).not.toBe(0);
        });

        /* Test to ensure that feed 1 is fully defined before loading
         * with the beforeEach function.
         */
        it('feed 1 is defined with a name and url', function() {
            expect(allFeeds[1]).toBeDefined();
            expect(allFeeds[1].url).toBeDefined();
            expect(allFeeds[1].url.length).not.toBe(0);
            expect(allFeeds[1].name).toBeDefined();
            expect(allFeeds[1].name.length).not.toBe(0);
        });

        /* Nest feed 0 and feed 1 entry tests to ensure that loadFeed does not
         * attempt to load an undefined feed.
         */
        describe('loading feed 0 followed by loading feed 1', function() {

            /* Asynchronously load feed 0 followed by feed 1 and save the entries
             * for both feeds.
             */
            beforeEach(function(done) {
              links0 = [];
              links1 = [];
              loadFeed(0, function() {
                $(".feed .entry-link").each(function() {
                  links0.push($(this).attr('href'));
                });
                loadFeed(1, function() {
                  $(".feed .entry-link").each(function() {
                    links1.push($(this).attr('href'));
                  });
                  done();
                });
              });
            });
    
            /* Test to ensure that loading a new feed changes entries by
             * comparing the saved entries for feed 0 and feed 1
             */ 
            it('changes feed content', function() {
              // log both entry arrays here to verify beforeEach functionality
              // console.log('links0 = ', links0);
              // console.log('links1 = ', links1);
              expect(links1).not.toEqual(links0);
            });
        });
    });
}());

