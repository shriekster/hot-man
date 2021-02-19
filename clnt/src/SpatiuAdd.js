import React from 'react';
import Tippy from '@tippyjs/react';
import Spinner from './Spinner';

class SpatiuAdd extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      
      loading: false,
      etaj: '',
      numar: '',
      tip: '0',
      confort: '0',
      beds: [],

    };
  
    this.generateKey = this.generateKey.bind(this);

    this.input = this.input.bind(this);

  }

  generateKey() {
    return Math.floor(new Date().getTime() * Math.random());
  }

  input(e) {
    
    switch (e.target.dataset.type) {

      case 'etaj': {

        this.setState({
          etaj: e.target.value
        });

        break;
      }

      case 'numar': {

        this.setState({
          numar: e.target.value
        });

        break;
      }


      case 'tip': {

        this.setState({
          tip: e.target.value
        });

        break;
      }

      case 'confort': {

        this.setState({
          confort: e.target.value
        });

        break;
      }

    }

  }

  render () {

    return (
      
      <>
        <div className='-space-add'>

          <input className='-space-add-input'
            data-type='etaj'
            type='text'
            maxLength={16}
            onInput={this.input}
            value={this.state.etaj}>
          </input>

          <input className='-space-add-input'
            data-type='numar'
            type='text'
            maxLength={16}
            onInput={this.input}
            value={this.state.numar}>
          </input>

          <div className='-space-add-select-container'>
            <select className='-space-add-select'
              value={this.state.tip}
              data-type='tip'
              onInput={this.input}>
              <option style={{color: 'lightslategray'}}
                value='0'
                key={this.generateKey()}>
                ---
              </option>
              {this.props.roomTypes.map (room => 
                <option
                  key={this.generateKey()}
                  value={room.Denumire}>
                  {room.Denumire}
                </option>
              )}
            </select>
          </div>

          <div className='-space-add-select-container'>
            <select className='-space-add-select'
              value={this.state.confort}
              data-type='confort'
              onInput={this.input}>
              <option style={{color: 'lightslategray'}}
                value='0'
                key={this.generateKey()}>
                ---
              </option>
              {this.props.confortTypes.map (conf => 
                <option
                  key={this.generateKey()}
                  value={conf.Denumire}>
                  {conf.Denumire}
                </option>
              )}
            </select>
          </div> 

        </div>

        <div className='-space-add-beds'>
          <div className='-space-add-beds-title'>Paturi</div>
        </div>

        <div className='-space-add-buttons-container'>
          <button className='-space-add-save'
            onClick={this.props.save}>
            Salvează
          </button>
          <button className='-space-add-cancel'
            onClick={this.props.cancel}>
            Renunță
          </button>
        </div>
      </>

    );

  }

}

export default SpatiuAdd;