import React, { Suspense } from 'react';
import Tippy from '@tippyjs/react';
import Select from 'react-select';
import Spinner from './Spinner';

import ConfortUpdater from './HotelUpdater';
import SpatiiUpdater from './HotelUpdater';
import PaturiUpdater from './HotelUpdater';
import HotelUpdater from './HotelUpdater';

import contact from './images/contact.svg';

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
            <span className='--icon-wrapper'><i className='fas fa-door-open --overview-icon'></i></span><span className='--overview-posd'> Spații</span>
          </div>
          <div className={'--overview-bed-types --overview-posr ' + this.state.paturiMenuClass}
            onClick={() => this.changeView('PaturiUpdater')}>
            <span className='--icon-wrapper'><i className='fas fa-bed --overview-icon'></i></span><span className='--overview-posd'> Paturi</span>
          </div>
          <div className={'--overview-hotel-info --overview-posr ' + this.state.hotelMenuClass}
            onClick={() => this.changeView('HotelUpdater')}>
           <span className='--icon-wrapper'>
           {/*
            <i className='fas fa-map-marker-alt --overview-icon'></i>
            <i className='fas fa-phone --overview-icon'></i>
            <i className='fas fa-at --overview-icon'></i>
           */}
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="512" height="512"><g id="Communicate"><path d="M26.9,21.314l-4.949-4.95a1,1,0,0,0-1.414,0l-2.122,2.121a3,3,0,0,1-4.243,0l-.242-.242a3,3,0,0,1,0-4.243l2.121-2.122a1,1,0,0,0,0-1.414L11.1,5.515a1,1,0,0,0-1.414,0L7.565,7.636a9.01,9.01,0,0,0,0,12.728l4.485,4.485a9.01,9.01,0,0,0,12.728,0L26.9,22.728A1,1,0,0,0,26.9,21.314Zm-5.656-2.829,3.535,3.536-.707.707-3.535-3.536ZM10.394,7.636l3.535,3.535-.707.708L9.686,8.343Zm3.07,15.8L8.979,18.95a7.012,7.012,0,0,1-.657-9.142l3.556,3.556a5.009,5.009,0,0,0,.637,6.293l.242.242a5.012,5.012,0,0,0,6.293.637l3.556,3.556A7.013,7.013,0,0,1,13.464,23.435Z"/><path d="M27,32H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H27a3,3,0,0,1,3,3V29A3,3,0,0,1,27,32ZM5,4A1,1,0,0,0,4,5V29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1V5a1,1,0,0,0-1-1Z"/><path d="M27,62H5a3,3,0,0,1-3-3V37a3,3,0,0,1,3-3H27a3,3,0,0,1,3,3V59A3,3,0,0,1,27,62ZM5,36a1,1,0,0,0-1,1V59a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1V37a1,1,0,0,0-1-1Z"/><path d="M25,41H7a1,1,0,0,0-1,1V54a1,1,0,0,0,1,1H25a1,1,0,0,0,1-1V42A1,1,0,0,0,25,41ZM16,48.65,9.632,43H22.366Zm-3.734-.641L8,51.78V44.225Zm1.506,1.337.9.8a1.993,1.993,0,0,0,2.671.005l.9-.8L22.361,53H9.639Zm5.972-1.337L24,44.225V51.78Z"/><path d="M59,2H37a3,3,0,0,0-3,3V29a3,3,0,0,0,3,3h5V44.538l-1.17-2.479a2.962,2.962,0,0,0-1.369-1.731,3.007,3.007,0,0,0-2.281-.3l-.921.248a2,2,0,0,0-1.378,2.56l4.174,12.124a.988.988,0,0,0,.182.32l2.709,3.2L42,61.021A1,1,0,0,0,43,62H57a1,1,0,0,0,1-1V58.3l1.832-2.748A1.006,1.006,0,0,0,60,55V42a2.926,2.926,0,0,0-.874-2.108,3.058,3.058,0,0,0-3.23-.682,2.867,2.867,0,0,0-.77-1.318,3.06,3.06,0,0,0-3.23-.682,2.867,2.867,0,0,0-.77-1.318A3.053,3.053,0,0,0,48,35.171V32H59a3,3,0,0,0,3-3V5A3,3,0,0,0,59,2ZM49,37a.974.974,0,0,1,.712.306A.957.957,0,0,1,50,38v7a1,1,0,0,0,2,0V40a1,1,0,0,1,1-1,.974.974,0,0,1,.712.306A.957.957,0,0,1,54,40v5a1,1,0,0,0,2,0V42a1,1,0,0,1,1-1,.974.974,0,0,1,.712.306A.957.957,0,0,1,58,42V54.7l-1.832,2.748A1.006,1.006,0,0,0,56,58v2H43.979l-.041-1.921a1,1,0,0,0-.236-.626l-2.818-3.326L36.779,42.2l.914-.246a1.018,1.018,0,0,1,.768.1.98.98,0,0,1,.462.6c.015.059,3.173,6.763,3.173,6.763A1,1,0,0,0,44,49V29.112A1.082,1.082,0,0,1,44.907,28a.974.974,0,0,1,.805.3A.957.957,0,0,1,46,29V45a1,1,0,0,0,2,0V38A1,1,0,0,1,49,37Zm11-8a1,1,0,0,1-1,1H48V29a2.926,2.926,0,0,0-.874-2.108,2.966,2.966,0,0,0-2.387-.881A3.077,3.077,0,0,0,42,29.112V30H37a1,1,0,0,1-1-1V5a1,1,0,0,1,1-1H59a1,1,0,0,1,1,1Z"/><path d="M48,8a8,8,0,0,0,0,16h4a1,1,0,0,0,0-2H48a6,6,0,1,1,6-6v1a1,1,0,0,1-2,0V16a4.033,4.033,0,1,0-1.286,2.92A2.987,2.987,0,0,0,56,17V16A8.009,8.009,0,0,0,48,8Zm0,10a2,2,0,1,1,2-2A2,2,0,0,1,48,18Z"/></g></svg>
          </span><span className='--overview-posd'> Hotel</span>
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
