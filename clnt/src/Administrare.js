import React from 'react';
import Tippy from '@tippyjs/react';

import HotelCreator from './HotelCreator';
import HotelUpdater from './HotelUpdater';
import HotelOverview from './HotelOverview';

class Administrare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      judete: [
        { value: 'AB', label: 'Alba' },
        { value: 'AR', label: 'Arad' },
        { value: 'AG', label: 'Arges' },
        { value: 'BC', label: 'Bacău' },
        { value: 'BH', label: 'Bihor' },
        { value: 'BN', label: 'Bistrița-Năsăud' },
        { value: 'BT', label: 'Botoșani' },
        { value: 'BV', label: 'Brașov' },
        { value: 'BR', label: 'Brăila' },
        { value: 'B1', label: ' București - Sectorul 1' },
        { value: 'B2', label: ' București - Sectorul 2' },
        { value: 'B3', label: ' București - Sectorul 3' },
        { value: 'B4', label: ' București - Sectorul 4' },
        { value: 'B5', label: ' București - Sectorul 5' },
        { value: 'B6', label: ' București - Sectorul 6' },
        { value: 'BZ', label: 'Buzău' },
        { value: 'CS', label: 'Caraș-Severin' },
        { value: 'CL', label: 'Călărași' },
        { value: 'CJ', label: 'Cluj' },
        { value: 'CT', label: 'Constanța' },
        { value: 'CV', label: 'Covasna' },
        { value: 'DB', label: 'Dâmbovița' },
        { value: 'DJ', label: 'Dolj' },
        { value: 'GL', label: 'Galați' },
        { value: 'GR', label: 'Giurgiu' },
        { value: 'GJ', label: 'Gorj' },
        { value: 'HR', label: 'Harghita' },
        { value: 'HD', label: 'Hunedoara' },
        { value: 'IL', label: 'Ialomița' },
        { value: 'IS', label: 'Iași' },
        { value: 'IF', label: 'Ilfov' },
        { value: 'MM', label: 'Maramureș' },
        { value: 'MH', label: 'Mehedinți' },
        { value: 'MS', label: 'Mureș' },
        { value: 'NT', label: 'Neamț' },
        { value: 'OT', label: 'Olt' },
        { value: 'PH', label: 'Prahova' },
        { value: 'SM', label: 'Satu Mare' },
        { value: 'SJ', label: 'Sălaj' },
        { value: 'SB', label: 'Sibiu' },
        { value: 'SV', label: 'Suceava' },
        { value: 'TR', label: 'Teleorman' },
        { value: 'TM', label: 'Timiș' },
        { value: 'TL', label: 'Tulcea' },
        { value: 'VL', label: 'Vâlcea' },
        { value: 'VS', label: 'Vaslui' },
        { value: 'VN', label: 'Vrancea' },
      ]
    };
  } 

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div id='administrare-title'
          className='administrare-title'>
          Administrarea hotelului
        </div>
        <hr className='view--separator'/>
        <div id='view-administrare'
          className='view-administrare'>
          {
            this.props.hotel.nume  ?  /** Previously HotelUpdater was rendered */
            <HotelOverview
              token={this.props.token}
              judete={this.state.judete}
              hotel={this.props.hotel}
              hotelUpdate={this.props.onHotelUpdate}
              onChange={this.props.onChange} /> :
            <HotelCreator
              token={this.props.token}
              judete={this.state.judete}
              hotel={this.props.hotel}
              hotelUpdate={this.props.onHotelUpdate}
              onChange={this.props.onChange} />
          }
        </div>
      </div>
    );
  }
}

export default Administrare;
