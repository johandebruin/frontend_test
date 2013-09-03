(function(doc) {
    'use strict';

    /*
     * Constructor for the slideshow Image Rotator
     * @param rotator_id: id of the dom element that contain the childs of the
     * rotator
     * @param timing: time in miliseconds to display the animation
     */
    window.ImageRotator = function(rotator_id, timing) {
        this.rotator = doc.getElementById(rotator_id);
        this.timing = timing;
        this._init();


        var that = this;
        
        this.interval = setInterval(function() {
            that._rotate(that);
        }, this.timing + 1000);
        
    };


    /*
     * Inizialize the rotator making sure that everythig it's ok.
     */
    ImageRotator.prototype._init = function() {
        var rotator_elements = this.rotator.children;

        //We make sure that all the other elements except the first does
        //have the hidden status. 
        for (var i = 0; i < rotator_elements.length; i++) {

            if (i === 0)
                continue;
            if (!rotator_elements[i].hasClassName("hide")) {
                rotator_elements[i].addClassName("hide");
            }
        }
    };


    ImageRotator.prototype._animateTop = function(element1, element2, time, callback) {
        var height = element1.clientHeight;
        this.rotator.style.height = height + 'px';

        var top = 0;

        var diff = height / time * 10;

        function frame() {
            top -= diff;  // update parameters
            element1.style.top = top + 'px'; // show frame 
            element2.style.top = top + 'px';

            if (top < height * -1) {  // check finish condition
                //And just to be nice we reset the stuff
                element1.style.top = null;
                element2.style.top = null;
                callback();
                clearInterval(id);
            }
        }
        var id = setInterval(frame, 10) // draw every 10ms
    };


    ImageRotator.prototype._rotate = function(that) {
        var rotator_elements = this.rotator.children;
        //We catch the displayed element
        var next;
        var i = 0;
        //I've tryed to be too elegant and create a bug with the last animation,
        //unfortnaly i need this solution to make the slides responsive and I
        //don't have time to figure out another elegant solution atm.
        var hack = false;
        for (i = 0; i < rotator_elements.length; i++) {
            if (!rotator_elements[i].hasClassName("hide")) {
                next = i + 1;
                if (next === rotator_elements.length) {
                    next = 0;
                    hack = true;
                }
                break;
            }
        }
        rotator_elements[next].removeClassName("hide");

        if (hack) {
            rotator_elements[i].addClassName("hide");
        } else {
            that._animateTop(rotator_elements[i], rotator_elements[next], 1000, function() {
                rotator_elements[i].addClassName("hide");

            });
        }
    };


}(document));


/*
 * Some prototype functions for native javascript element to help me to change
 * and remove css classes.
 */
Element.prototype.hasClassName = function(name) {
    return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(this.className);
};

Element.prototype.addClassName = function(name) {
    if (!this.hasClassName(name)) {
        this.className = this.className ? [this.className, name].join(' ') : name;
    }
};

Element.prototype.removeClassName = function(name) {
    if (this.hasClassName(name)) {
        var c = this.className;
        this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "");
    }
};