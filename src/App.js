import React, { Component } from 'react';
import './App.css';

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
            wadoUriRoot: 'http://192.168.1.115:8080/dcm4chee-arc/aets/DCM4CHEE/wado',
            qidoRoot: 'http://192.168.1.115:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
            wadoRoot: 'http://192.168.1.115:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
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
  }

  render () { 
    return(
      <div id={this.containerId}/>
    )
  }
}

export default App;
