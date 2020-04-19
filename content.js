document.addEventListener('keydown', function(event) {
//  cmd + shift + S
  if (event.metaKey && event.shiftKey && event.which === 83) {
  


    var object = {};

    var text = getSelectionText();  
    
    var links = document.getElementsByTagName("link");
    if (getCanonical()){
      var page = getCanonical();    
    }else{
      var page = document.location.href;      
    };


    // https://stackoverflow.com/questions/10097988/chrome-extension-prevent-css-from-being-over-written
    // Create our iframe and style it so that we can see it...
    var iframe = document.createElement('iframe');
    document.documentElement.appendChild(iframe);
    iframe.style.cssText = "width:600px; height:1000px; background-color:white; position:fixed; top:0px; right:0px; z-index:99999;"



    chrome.storage.local.get([page], function(result) {

        var page_object = {};        
        // page_object["date"] = getDate(); needs to get attached to each quote item
        page_object["url"] = page;
        page_object["title"] = document.title;
        
        if(getMeta("author")){
          page_object["author"] = getMeta("author");  
        }else{
        page_object["author"] = getMeta("twitter:site");
        }

        var quotes = [];
        var quote = {};

        quote["text"] = text;
        quote["date"] = getDate();

        quotes.push(quote);

        if(result[page] == null){
            var combined = quotes;
        }
        else{
            var combined = quotes.concat(result[page]["quotes"])
        }

        page_object["quotes"] = combined;
        
        object[page] = page_object; 

        chrome.storage.local.set(object, function() {            
            console.log(object[page]["quotes"][0]);

            var browser_page = chrome.runtime.getURL("options.html");

            // document.getElementsByTagName('body')[0].insertAdjacentHTML( 'afterbegin', 
            // ^ above is the original code here

            // create create an element with minified style and stick it in the head
            var popupStyle = document.createElement('style'); // is a node
            popupStyle.innerHTML = '#citation-51925{all:revert}#citation-51925 *{all:revert}#citation-51925 .portal-container{all:revert}#citation-51925 .portal-container *{all:revert}#citation-51925 .portal-container{font-family:-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";text-rendering:optimizeLegibility;border:1px solid #c2dfe3;border-radius:8px;margin-bottom:25px;max-width:800px;-webkit-transition:all .2s ease;-moz-transition:all .2s ease;-ms-transition:all .2s ease;-o-transition:all .2s ease;transition:all .2s ease}#citation-51925 .portal-container:hover{transform:translateY(-3px);box-shadow:0 6px 20px 0 rgba(0,0,0,.15);border:1px solid #9db8bf}#citation-51925 .portal-container .portal-parent{overflow:hidden;position:relative;width:100%;box-sizing:border-box}#citation-51925 .portal-container .portal-parent .portal-parent-text{padding:15px;color:#5c6d73;z-index:40}#citation-51925 .portal-container .portal-parent .portal-content{padding:15px;color:#464a4d;line-height:140%}#citation-51925 .portal-container .portal-head{border-top:1px solid #c2dfe3;display:flex;flex-flow:row nowrap;justify-content:start;align-items:stretch;padding-left:15px;-webkit-transition:all .2s ease;-moz-transition:all .2s ease;-ms-transition:all .2s ease;-o-transition:all .2s ease;transition:all .2s ease}#citation-51925 .portal-container .portal-head .portal-avatar{border-radius:100%;border:1px solid #c2dfe3;width:42px;height:42px;margin:12px 0;position:relative}#citation-51925 .portal-container .portal-head .portal-avatar img{max-width:24px;position:absolute;margin:auto;top:0;left:0;right:0;bottom:0}#citation-51925 .portal-container .portal-head .portal-metadata{min-width:0;display:flex;flex-shrink:1;align-items:center;margin-left:10px}#citation-51925 .portal-container .portal-head .portal-author{font-size:14px;color:#000;font-weight:600;margin-bottom:2px}#citation-51925 .portal-container .portal-head .portal-title{font-size:14px;color:#9db8bf;max-width:100%}#citation-51925 .portal-container .portal-head .portal-title .title-wrapper{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:600;color:#5c6d73}#citation-51925 .portal-container .portal-head .portal-backlink{margin-left:auto;display:flex;flex-shrink:1;align-items:center;min-width:80px;padding:0 15px;border-left:1px solid #c2dfe3}#citation-51925 .portal-container .portal-head .portal-backlink .portal-arrow{font-size:14px;color:#9db8bf;text-decoration:none;-webkit-transition:opacity .1s ease;-moz-transition:opacity .1s ease;-ms-transition:opacity .1s ease;-o-transition:opacity .1s ease;transition:opacity .1s ease}#citation-51925 .portal-container .portal-head .portal-backlink .portal-arrow:hover{opacity:.5}#citation-51925 input{border:none;background-image:none;background-color:transparent;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}#citation-51925 #citation-capture{font-family:-apple-system,system-ui,"Open Sans","Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";overflow:hidden!important;width:600px;height:auto;position:fixed!important;top:10px!important;right:10px!important;overflow-x:hidden;overflow-y:auto;max-height:calc(100% - 50px);border:5px solid #e7e7e5!important;border-radius:.25em;padding:24px;z-index:2147483;background-color:#fff}#citation-51925 .citation-meta{display:flex;flex-direction:row;justify-content:space-between;align-items:center;flex:0 0 100%;margin-bottom:20px}#citation-51925 .citation-meta form:first-child{margin-right:10px}#citation-51925 .citation-input{width:280px;display:block;padding:11px;height:37px;font-size:12px;box-shadow:none;-webkit-appearance:none;color:#464a4d;background:#eceeef;box-sizing:border-box;border-radius:4px;-webkit-transition:all .1s ease;-moz-transition:all .1s ease;-ms-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}#citation-51925 .citation-input#comment-field{border-radius:10px}#citation-51925 .citation-input:focus{outline:0;box-shadow:inset 0 0 0 1px #9db8bf}#citation-51925 .citation-input-label{display:block;font-size:12px;margin-bottom:2px}#citation-51925 .control-button{border:none;text-align:left;width:auto;min-width:85px;height:24px;font-size:14px;font-weight:500;font-family:inherit;display:block;-webkit-transition:all .2s ease;-moz-transition:all .2s ease;-ms-transition:all .2s ease;-o-transition:all .2s ease;transition:all .2s ease}#citation-51925 .control-button:hover{cursor:pointer;opacity:.5}#citation-51925 .control-button#getlink{color:#395fe5;height:37px}#citation-51925 .citation-bottom{height:50px;display:flex;flex-direction:row;justify-content:space-between;align-items:start;flex:0 0 100%;margin-top:-13px}#citation-51925 .citation-bottom div{display:inline-block}#citation-51925 #save-button{-webkit-appearance:none;width:130px;display:block;padding:11px;font-size:14px;box-shadow:none;background:#f2f7fa;border:.5px solid #d5d5d5;box-sizing:border-box;border-radius:4px}';
            iframe.contentDocument.head.appendChild(popupStyle);

            // stick our css in the iframe body
            iframe.contentDocument.body.innerHTML = `

<div class="citation-capture-519256" id="citation-capture-519256">
<div class="citation-meta-519256">
<form>
<label class="citation-input-label-519256" for="Author">Author</label>
<input class="citation-input-519256" id="author-field" name="Author"></input>
</form>
<form>
<label class="citation-input-label-519256" for="Title">Title</label>
<input class="citation-input-519256" id="title-field" name="Title"></input>
</form>       
</div>

<div class="thickdivider"></div>



<div class="portal-container-519256">

<div id="portal-parent-519256" class="portal-parent">
<div class="portal-content-519256">To complete the tasks integration with VS Code, we will need to modify the task configuration from before to run the default Gulp task we just created. You can either delete the tasks.json file or empty it only keeping the "version": "2.0.0" property. Now execute Run Task from the global Terminal menu. Observe that you are presented with a picker listing the tasks defined in the gulp file. Select gulp: default to start the task. We allow you to scan the output for compile problems. Depending on the compiler, select an appropriate entry in the list to scan the tool output for errors and warnings. If you don't want to scan the output, select Never scan the build output from the presented list. At this point, if you create and/or modify Less or SASS files, you see the respective CSS files generated and/or changes reflected on save. You can also enable Auto Save to make things even more streamlined.
</div>       
</div> 

<div class="portal-head-519256">

<div class="portal-avatar-519256"><img src=""/></div>

<div class="portal-metadata-519256">
<div class="portal-title-519256">
<div class="portal-author-519256">Author Text</div>
<div class="title-wrapper-519256">CSS, SCSS, and Less support in Visual Studio Code</div>
</div> 
</div>

<div class="portal-backlink-519256"><a target="_blank" href="https://code.visualstudio.com/docs/languages/css" class="portal-arrow">Go to text <span class="right-arrow">&#8594;</span></a></div>

</div>       
</div>




<div class="thickdivider"></div>

<div class="citation-bottom-519256">
<div class="comment-519256">
<form>
  <input class="citation-input-519256" id="comment-field" placeholder="+ Add Comment"></input>
</form>
</div>
<div><button id="getlink-519256" class="control-button-519256"><> Embed</button></div>
<div><button id="save-button-519256">Save & Close</button></div>
</div>

</div>
`;
            
            // boundary.top from here if we wanna position relative to the text selection
            // https://stackoverflow.com/questions/4106109/selected-text-and-xy-coordinates
            /*
            var txt = window.getSelection(),
            range = txt.getRangeAt(0),
            boundary = range.getBoundingClientRect();
            */

            var time = 0;
            var textfocus = false;
            var ishover = false;
            var isPaused = false;
            txtAreaListenFocus();
            txtAreaListenBlur();

            let popup = document.querySelector(".citation-capture");
  
            popup.addEventListener("mouseover", function( event ) {   
                ishover = true;
            });

            popup.addEventListener("mouseout", function( event ) {   
                ishover = false;
            });

            AutoSave.start(object);

            var t = window.setInterval(function() {

                if(!ishover && !textfocus) {
                  time++;
                  if(time > 5){
                    var paras = document.getElementsByClassName('citation-capture');
                    while(paras[0]) {
                        paras[0].parentNode.removeChild(paras[0]); // remove all popups
                    };         
                    AutoSave.stop();              
                    clearInterval(t); // stop timer
                  };
                  console.log(time + "is hover: "+ishover + "is textfocus:"+textfocus);
                }

              }, 1000);

              function txtAreaListenFocus(){
                var txtArea = document.querySelector('#comment-field');
                txtArea.addEventListener('focus', function(event) {
                   textfocus = true;
                }.bind(this));
              };

              function txtAreaListenBlur(){
                var txtArea = document.querySelector('#comment-field');
                txtArea.addEventListener('blur', function(event) {
                  textfocus = false;
                }.bind(this));
              };


          });

      });

    }
  });

  

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
    
      // from here: https://gist.github.com/gleuch/2475825
      // selection range
      var range = window.getSelection().getRangeAt(0);

      // plain text of selected range (if you want it w/o html)
      var plaintext = window.getSelection();
          
      // document fragment with html for selection
      var fragment = range.cloneContents();

      // make new element, insert document fragment, then get innerHTML!
      var div = document.createElement('div');
      div.appendChild( fragment.cloneNode(true) );

      // your document fragment to a string (w/ html)! (yay!)
      var text = div.innerHTML;
      console.log(text);


    } else if (document.selection && document.selection.type != "Control") { // think this is for IE?
    text = document.selection.createRange().text;
    }
    return plaintext.toString();
};

function getMeta(metaName) {
    const metas = document.getElementsByTagName('meta');

    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute('name') === metaName) {
        return metas[i].getAttribute('content');
      }
    }

  
    return '';
  };

function getCanonical() {
  var canonical = "";
  var links = document.getElementsByTagName("link");
  for (var i = 0; i < links.length; i ++) {
      if (links[i].getAttribute("rel") === "canonical") {
          canonical = links[i].getAttribute("href")
      }
  }
  return canonical;
  };  

function getDate(){
  
  var today = Number(new Date());

  return today;
};

// From: https://gist.github.com/gcmurphy/3651776
var AutoSave = (function(){

    var timer = null;
    
	function getEditor(){
		var elems = document.querySelector("#comment-field");
		if (!elems)
			return null;
		return elems;
	}

	function save(object){
        console.log("running save");
		    var editor = getEditor(); 
            if (editor) {

            var page = document.location.href;

            object[page]["quotes"][0]["comment"] = editor.value;
            chrome.storage.local.set(object, function() { 
                console.log("autosaved");
                if(document.querySelector(".citation-saving").innerText == "Saving..."){
                  document.querySelector(".citation-saving").innerHTML = "<span id='tomtobysavedgreen'>Saved</span>";
              };
            });
            }
        };

	function restore(){ //don't think I actually need this restore function...?
        var page = document.location.href;
        var saved = "";
        chrome.storage.local.get([page], function(result) {
            saved = result[page]["quotes"][0]["comment"];
        });
        //var saved = localStorage.getItem("AUTOSAVE_" + document.location)
		var editor = getEditor();
		if (saved && editor){
			editor.value = saved; 
		}
	}

	return { 

		start: function(object){

            var editor = getEditor(); 
            console.log(editor);
                 
          editor.addEventListener("keydown", function( event ) {   
              document.querySelector(".citation-saving").innerText = "Saving...";
          });            

			if (editor.value.length <= 0)
				restore();

			if (timer != null){
				clearInterval(timer);
				timer = null;
			}
			timer = setInterval(function(){
                save(object)
            }, 1000);
		},

		stop: function(){

			if (timer){ 
				clearInterval(timer);
				timer = null;
			}

		}
	}

}());
