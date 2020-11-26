class UIPreview extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'

        // WRAPPER
        const wrapper = document.createElement("div");
        wrapper.innerHTML = template;
        this.shadow.appendChild(wrapper)
        
        // STYLE
        const styleEl = document.createElement("style");
        styleEl.innerHTML = style;
        this.shadow.appendChild(styleEl)

    }
    static get observedAttributes() { return ['c', 'l']; }

    handleTabChange(evt) {
        var tabName = evt.currentTarget.dataset.tab;
        //console.log("tabname", tabName);
        //console.log("test: ",  this.shadowRoot.childNodes, this.shadowRoot.firstChild.getElementsByClassName("tabcontent")) 
        var i, tabcontent, tablinks;

        // HIDE TABs' CONTENT
        tabcontent = this.shadowRoot.firstChild.getElementsByClassName("tabcontent")
        console.log("tabcontent", tabcontent.value)
        Array.from(tabcontent).forEach(tab => tab.style.display = "none")

        // CLEAN BUTTONs' STATUS
        this.buttonList.forEach(button => button.className = button.className.replace("active", ""))

        // ACTIVATE SPECIFIC TAB and CURRENT BUTTON 
        this.shadowRoot.getElementById(tabName).style.display = "block"
        evt.currentTarget.className += " active";
    }

    initTabs(){
        console.log("initTabs:", this)
        const buttonIds = ["ui-preview-button", "ui-html-button", "ui-css-button", "ui-js-button"]
        this.previewButton = this.shadowRoot.getElementById("ui-preview-button")
        this.htmlButton = this.shadowRoot.getElementById("ui-html-button")
        this.cssButton = this.shadowRoot.getElementById("ui-css-button")
        this.jsButton = this.shadowRoot.getElementById("ui-js-button")
        
        // create button list and attach listeners
        const buttonList = [this.previewButton, this.htmlButton, this.cssButton, this.jsButton]
        this.buttonList = buttonList;
        buttonList.forEach(button => button.addEventListener("click", this.handleTabChange.bind(this)))

        // IDENTIFY INNER PREVIEW ELEMENTS
        this.previewTab = this.shadowRoot.getElementById("ui-preview")
        const previewElements = Array.from(this.previewTab.childNodes).filter(el => el.nodeName !== "#text")

        // CHANGE HANDLERs
        const tabIds = ["ui-html", "ui-css", "ui-js"]
        tabIds.forEach((tabId,index) => {
            // Tab Container
            const tab = this.shadowRoot.getElementById(tabId);
            
            // Check initial value from UI code
            const initialValue = this.getAttribute(tabId)
            console.log("initial value", initialValue)
            // If exists, fill the tab value
            if (initialValue){
                tab.innerHTML = initialValue
                previewElements[index].innerHTML = initialValue
            }

            // Attach change handlers
            tab.addEventListener("change", function(e){
                // Append Values to Inner Preview Element
                previewElements[index].innerHTML = e.target.value
            })
        })

    }

    updateUI(){

    }

    connectedCallback() {
        console.log('Connected', this);
        this.initTabs()
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom square element attributes changed.');
    }


  }

  const template = `
    <div class="ui-tab">

        <div class="tab">
            <button data-tab="ui-preview" id="ui-preview-button" class="tablinks active" >Preview</button>
            <button data-tab="ui-html" id="ui-html-button" class="tablinks" >HTML</button>
            <button data-tab="ui-css" id="ui-css-button" class="tablinks" >CSS</button>
            <button data-tab="ui-js" id="ui-js-button" class="tablinks" >JS</button>
        </div>

        <div id="ui-preview" class="tabcontent">
            <div id="preview-html"></div>
            <style id="preview-css"></style>
            <script id="preview-js"></script>
        </div>

        <textarea id="ui-html" class="tabcontent html" contenteditable="true">
        </textarea>

        <textarea id="ui-css" class="tabcontent css" contenteditable="true">
        </textarea>

        <textarea id="ui-js" class="tabcontent javascript" contenteditable="true">
        </textarea>
    </div>
  `

const style = `
/* Style the tab */
.ui-tab {
    position:relative;
    border-radius:8px;
    overflow:hidden;
    box-sizing:border-box;
    max-width:700px;
    box-shadow: 0 4px 8px -1px rgba(0,0,0,0.2)
}

.tab {
  overflow: hidden;
  background-color: #f1f1f1;
  box-sizing:border-box;
}
textarea {
    display:block;
    min-height:200px;
    position:relative;
    box-sizing:border-box;
    background-color:#272c34;
    color:#fefefe;
    min-width:100%;
    max-width:100%;
    padding:16px 8px;

}
div#ui-preview {
    min-height:160px;
    position:relative;
    box-sizing:border-box;
    display:flex;
    border: 1px solid rgba(0,0,0,0.2);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}

/* Style the buttons inside the tab */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 8px 16px;
  transition: 0.3s;
  font-size: 14px;
  border-bottom:4px solid transparent;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #eee;
  border-bottom:4px solid blueviolet;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
}

.tablinks {font-weight:bold;}

`

  customElements.define('ui-preview', UIPreview);
