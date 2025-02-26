import React, { Component } from 'react';
import './App.css';


import { installViewer } from '@ohif/viewer';

class App extends Component {
  constructor(props) {
    super(props);
    window.config = {
      routerBasename: '/',
      filterQueryParam: true,
      showStudyList: true, // Asegura que la lista de estudios sea visible
      servers: {
        dicomWeb: [
          {
            name: 'DCM4CHEE',
            wadoUriRoot: 'https://192.168.1.108:3001/dcm4chee-arc/aets/DCM4CHEE/wado',
            qidoRoot: 'https://192.168.1.108:3001/dcm4chee-arc/aets/DCM4CHEE/rs',
            wadoRoot: 'https://192.168.1.108:3001/dcm4chee-arc/aets/DCM4CHEE/rs',
            qidoSupportsIncludeField: true,
            imageRendering: 'wadors',
            thumbnailRendering: 'wadors',
          }
        ]
      },
    };   
  
  this.ohifViewerConfig = window.config; // or set it here
  this.containerId = 'ohif';
}


  componentRenderedOrUpdatedCallback = function() {
      console.log('OHIF Viewer rendered/updated');
  };

  componentDidMount() {
    
    
    installViewer(
        this.ohifViewerConfig,
        this.containerId,
        this.componentRenderedOrUpdatedCallback
      );
      
      setTimeout(() => {
        const viewerContainer = document.getElementById(this.containerId);
        if (viewerContainer) {
          viewerContainer.style.height = '100vh';
          viewerContainer.style.width = '100%';
        }

        if (window.matchMedia("(max-width: 768px)").matches) {
          document.body.classList.add("ohif-mobile-mode");
          window.dispatchEvent(new Event("resize"));
        }
        
        if (window.innerWidth <= 768) {
          document.body.classList.add("ohif-mobile-mode");
          window.dispatchEvent(new Event("resize"));
        }
        
        if(document.getElementsByClassName("roundedButtonWrapper noselect active").length){
          document.getElementsByClassName("roundedButtonWrapper noselect active")[0].click();
          window.dispatchEvent(new Event("resize"));
        }

        if(document.getElementsByClassName("toolbar-button").length){
          document.getElementsByClassName("toolbar-button")[0].click();
          window.dispatchEvent(new Event("resize"));
        }
        
        console.log("this", window)
        window.dispatchEvent(new Event('resize'));
      }, 1000);
  }
  
  render () { 
    return(
      <div id={this.containerId}/>
    )
  }
}

export default App;
