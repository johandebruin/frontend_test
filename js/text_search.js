(function(doc) {
    'use strict';

    window.TextSearch = function(needle, haystack) {
        this.nresults = 0;
        this.haystack = haystack.replace(/<[^>]*>/g, "");
        this.needle = needle;
        
        this._search();
    };
    
    TextSearch.prototype._search = function() {
        var regex = new RegExp(this.needle, 'gi');
        var matches = this.haystack.match(regex);
        
        if(matches) {
            this.nresults = matches.length;
        } else {
            this.nresults = 0;
        }
        
        console.log(matches);
    };
    
    
}(document));