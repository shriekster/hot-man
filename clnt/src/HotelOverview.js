import React from 'react';
import Tippy from '@tippyjs/react';
import Select from 'react-select';
import Spinner from './Spinner'

class HotelOverview extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.onGenericKeyDown = this.onGenericKeyDown.bind(this);

    this.state = {
      showConfortSettings: false,
      showSpatiiSettings: false,
      showPaturiSettings: false,
      showHotelSettings: false,
  
    };
  }


  // numeric input only
  onKeyDown(e) {
    let charCode = (e.which) ? e.which : e.keyCode;
    
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if(charCode !== 8 && charCode !== 9 && 
        charCode !== 17 && charCode !== 46 && charCode !== 13 && 
        !(charCode >= 37 && charCode <= 40)) {
        e.preventDefault();
        return false;
      }
    }

    if (e && e.target.value.length > 13) {
      if(charCode !== 8 && charCode !== 9 && 
        charCode !== 17 && charCode !== 46 && charCode !== 13 && 
        !(charCode >= 37 && charCode <= 40))  {
        e.preventDefault();
        return false;
      }
    }

    return true;
  }

  // input max length: 64
  onGenericKeyDown(e) {
    let charCode = (e.which) ? e.which : e.keyCode;

    if (e && e.target.value.length > 64) {
      if(charCode !== 8 && charCode !== 9 && 
          charCode !== 17 && charCode !== 46 && charCode !== 13 && 
          !(charCode >= 37 && charCode <= 40)) {
        e.preventDefault();
        return false;
      } 
    } 
    return true;
  }

  componentDidMount() {
    // fetch categorii confort, spatii, paturi?
  }

  render() {
    return (
      <div id='hotel-overview'
        className='hotel-overview'>
        <div className='--overview-container'>
          <div className='--overview-comfort-levels --overview-posr'>
            <span className='--icon-wrapper'><i className='fas fa-couch --overview-icon'></i></span><span className='--overview-posd'> Confort</span>
          </div>
          <div className='--overview-room-types --overview-posr'>
            <span className='--icon-wrapper'><i className='fas fa-house-user --overview-icon'></i></span><span className='--overview-posd'> Spații</span>
          </div>
          <div className='--overview-bed-types --overview-posr'>
            <span className='--icon-wrapper'><i className='fas fa-bed --overview-icon'></i></span><span className='--overview-posd'> Paturi</span>
          </div>
          <div className='--overview-hotel-info --overview-posr'>
           <span className='--icon-wrapper'><i className='fas fa-map-marked-alt --overview-icon'></i></span><span className='--overview-posd'> Hotel</span>
          </div>
        </div>
      </div>
    );
  }
}

export default HotelOverview;
