(function ( $ ) {
        $.fn.validator = function( options ) {
            // This is the easiest way to have default options.
            var settings = $.extend({
                // These are the defaults.
                type: "string",
                long: "no-limit"
            }, options );
            
            var value = $( this ).val();
            //validating size 
            if(settings.long != "no-limit" && value.length > settings.long ){
                settings.long = parseInt(settings.long);
                console.log(settings.long);
                $( this ).val(value.substring(0, settings.long));//cutting the string
            }else{            
                //validating type string
                if (settings.type == "string")           var regExpNoEspecial = /[{}%$]/g;
                else if (settings.type == "number")    var regExpNoEspecial = /[^0-9.-]/g;
                else if (settings.type == "integerNumber")  var regExpNoEspecial = /[^0-9]/g;


                if (value == null) $( this ).val("");//write empty string if there are no value in the input
                var newValue = [];
                newValue = [];
                for (var i = 0, len = value.length; i < len; i++) {
                    if (!value[i].match(regExpNoEspecial)) {
                        newValue[i] = value[i];
                    }
                }
                $( this ).val(newValue.join(''));           
            }
        }; 
    }( jQuery ));        
    
$( document ).ready(function() {
        var allInputs = $( ":input[validator]" );        
        console.log(allInputs);
        allInputs.each(function(){           
            this.addEventListener('keyup', function(){            
                //get the data values from the input
                var long = this.getAttribute("validator-long");
                var type = this.getAttribute("validator");
                //if there are not a long specified means no limit in the input
                if(long == null) long = "no-limit";                
                //Calling the plugin
                $(this).validator({type:type,long: long});                               
            }, false);  
        });
    });