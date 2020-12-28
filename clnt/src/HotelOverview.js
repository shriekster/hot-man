import React, { Suspense } from 'react';
import Tippy from '@tippyjs/react';
import Select from 'react-select';
import Spinner from './Spinner';

import ConfortUpdater from './HotelUpdater';
import SpatiiUpdater from './HotelUpdater';
import PaturiUpdater from './HotelUpdater';
import HotelUpdater from './HotelUpdater';


class HotelOverview extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.onGenericKeyDown = this.onGenericKeyDown.bind(this);

    this.changeView = this.changeView.bind(this);

    this.state = {

      components: {
        ConfortUpdater: ConfortUpdater,
        SpatiiUpdater: SpatiiUpdater,
        PaturiUpdater: PaturiUpdater,
        HotelUpdater: HotelUpdater,
      },

      defaultComponent: HotelUpdater,
      defaultComponentName: 'HotelUpdater',

      confortMenuClass: '',
      spatiiMenuClass: '',
      paturiMenuClass: '',
      hotelMenuClass: '--overview-active-menu ',
  
    };
  }

  changeView(component=this.state.defaultComponentName) {
    let nextView = component;
    
    let nextConfortMenuClass = '';
    let nextSpatiiMenuClass = '';
    let nextPaturiMenuClass = '';
    let nextHotelMenuClass = '';

    if(Object.keys(this.state.components).includes(nextView)) {
      nextView = this.state.components[component];

    } else {
      nextView = HotelUpdater;
      nextHotelMenuClass = ' --overview-active-menu ';
    }

    switch(component) {
      case 'ConfortUpdater': {
        nextConfortMenuClass += ' --overview-active-menu ';
        break;
      }

      case 'SpatiiUpdater': {
        nextSpatiiMenuClass += ' --overview-active-menu ';
        break;
      }

      case 'PaturiUpdater': {
        nextPaturiMenuClass += ' --overview-active-menu ';
        break;
      }

      case 'HotelUpdater': {
        nextHotelMenuClass += ' --overview-active-menu ';
        break;
      }
    }

    this.setState({
      defaultComponent: nextView,

      confortMenuClass: nextConfortMenuClass,
      spatiiMenuClass: nextSpatiiMenuClass,
      paturiMenuClass: nextPaturiMenuClass,
      hotelMenuClass: nextHotelMenuClass,
    })
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
    let Component = this.state.defaultComponent;

    return (
      <div id='hotel-overview'
        className='hotel-overview'>
        <div className='--overview-container'>
          <div className={'--overview-comfort-levels --overview-posr ' + this.state.confortMenuClass}
            onClick={() => this.changeView('ConfortUpdater')}>
            <span className='--icon-wrapper'><i className='fas fa-couch --overview-icon'></i></span><span className='--overview-posd'> Confort</span>
          </div>
          <div className={'--overview-room-types --overview-posr ' + this.state.spatiiMenuClass}
            onClick={() => this.changeView('SpatiiUpdater')}>
            <span className='--icon-wrapper'><i className='fas fa-house-user --overview-icon'></i></span><span className='--overview-posd'> Spații</span>
          </div>
          <div className={'--overview-bed-types --overview-posr ' + this.state.paturiMenuClass}
            onClick={() => this.changeView('PaturiUpdater')}>
            <span className='--icon-wrapper'><i className='fas fa-bed --overview-icon'></i></span><span className='--overview-posd'> Paturi</span>
          </div>
          <div className={'--overview-hotel-info --overview-posr ' + this.state.hotelMenuClass}
            onClick={() => this.changeView('HotelUpdater')}>
           <span className='--icon-wrapper'><i className='fas fa-map-marked-alt --overview-icon'></i></span><span className='--overview-posd'> Hotel</span>
          </div>
        </div>
        <div className='--overview-component-container'>
        <Suspense 
              fallback=
              {
                <Spinner 
                status='altLoading'
                visibility={true}/>
              }>
              <Component 
                user={this.state.user}
                token={this.state.token}
                hotel={this.state.hotel}
                onChange={this.props.onChange}
                changeMenu={this.changeView}
                onHotelUpdate={this.props.hotelUpdate} />
            </Suspense>
        </div>
      </div>
    );
  }
}

export default HotelOverview;