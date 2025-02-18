import React, { Component } from 'react';
import './App.css';
import { Viewer } from "@ohif/viewer";


import { installViewer } from '@ohif/viewer';
//import {OHIFExtDicomMicroscopy} from '@ohif/extension-dicom-microscopy'

class App extends Component {
  constructor(props) {
    super(props);
    window.config = {
      routerBasename: '/',
      filterQueryParam: true,
//      extensions: [OHIFExtDicomMicroscopy],
      servers: {
        dicomWeb: [
          {
            name: 'DCM4CHEE',
            wadoUriRoot: 'http://192.168.1.114:3001/dcm4chee-arc/aets/DCM4CHEE/wado',
            qidoRoot: 'http://192.168.1.114:3001/dcm4chee-arc/aets/DCM4CHEE/rs',
            wadoRoot: 'http://192.168.1.114:3001/dcm4chee-arc/aets/DCM4CHEE/rs',
            qidoSupportsIncludeField: true,
            imageRendering: 'wadors',
            thumbnailRendering: 'wadors',            
            // enableStudyLazyLoad: true,
            // studyInstanceUIDs: this.props.studyID,
          }
        ]
      } 
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
      document.getElementsByClassName("cornerstone-canvas").length > 0 ? document.getElementsByClassName("cornerstone-canvas")[0].height = 1200 : null
  }

  render () { 
    return(
      <div id={this.containerId}/>
    )
  }
}

export default App;
