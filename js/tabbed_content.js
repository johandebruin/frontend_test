(function(doc) {
    'use strict';

    /*
     * Constructor for the slideshow Image Rotator
     * @param rotator_id: id of the dom element that contain the childs of the
     * rotator
     * @param timing: time in miliseconds to display the animation
     */
    window.TabbedContent = function(navigator, navigation) {
        this.navigator = navigator;
        this.navigation = navigation;

        this._setTriggerEvent(this.navigator);
        this._clearSelected();
        //We set the first tab at the construction of the object
        this._setTab(0);
    };


    TabbedContent.prototype._setTriggerEvent = function() {
        var navigator_elements = this.navigator.children;

        for (var i = 0; i < navigator_elements.length; i++) {
            //Little hack i've learn from the book beggining google maps api v3
            var that = this;
            (function(i) {
                navigator_elements[i].onclick = function() {
                    that._clearSelected();
                    that._setTab(i);
                };
            })(i);
        }
    };

    TabbedContent.prototype._setTab = function(i) {
        var navigator_elements = this.navigator.children;
        var navigation_elements = this.navigation.children;
        if (!navigator_elements[i].hasClassName("selected")) {
            navigator_elements[i].addClassName("selected");
        }
        
        if(navigation_elements[i].hasClassName("hide")) {
            navigation_elements[i].removeClassName("hide");
        }
    };

    TabbedContent.prototype._clearSelected = function() {
        var navigator_elements = this.navigator.children;
        var navigation_elements = this.navigation.children;
        console.log(navigation_elements);

        for (var i = 0; i < navigator_elements.length; i++) {
            if (navigator_elements[i].hasClassName("selected")) {
                navigator_elements[i].removeClassName("selected");
            }
            console.log(i);
            if (!navigation_elements[i].hasClassName("hide")) {
                navigation_elements[i].addClassName("hide");
            }
        }
    }


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