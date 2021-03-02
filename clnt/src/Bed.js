import React from 'react';
import Tippy from '@tippyjs/react';
 
class Bed extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      
      index: 0,
      count: '',
      type: '-'

    };
  
    this.generateKey = this.generateKey.bind(this);

    this.input = this.input.bind(this);

  }

  generateKey() {
    return Math.floor(new Date().getTime() * Math.random());
  }

  input(e) {
    
    switch (e.target.dataset.type) {

      case 'count': {

        this.setState({
          count: e.target.value
        });
                
        break;
      }

      case 'type': {

        this.setState({
          type: e.target.value
        });

        break;
      }

    }

  }

  render () {

    return (
      
        <div className='--bed-data'
            key={this.generateKey()}>

            <div style={{width: '29px'}}></div>
            <input className='-space-add-input'
              style={{width: '30%'}}
              data-type='count'
              type='text'
              placeholder='numărul de paturi'
              maxLength={16}
              onInput={this.input}
              value={this.state.count}>
            </input>
            
            <div className='--bed-cell'>x</div>

            <div className='-space-add-select-container'
            style={{width: '30%'}}>
            <select className='-space-add-select'
                style={{color: this.state.type === '-'
                            ? 'lightslategray'
                            : 'darkslategray'}}
                value={this.state.type}
                data-type='type'
                onInput={this.input}>
                <option style={{color: 'lightslategray'}}
                value='0'
                key={this.generateKey()}>
                [tipul de pat]
                </option>
                {this.props.bedTypes.map (type => 
                <option
                    key={this.generateKey()}
                    value={type.Denumire}>
                    {type.Denumire}
                </option>
                )}
            </select>
            </div>
            <div className='--bed-cell'>
            <Tippy
                content={
                <div>Șterge pat</div>
                }
                allowHTML={true}
                placement='right'
                arrow={true}
                theme='material-confort-disabled'
                hideOnClick={false}
                offset={[0, 10]}>
                <i className='fas fa-trash-alt --remove-bed-icon'
                onClick={() => this.props.removeBed(this.props.index)}></i>
            </Tippy>
            </div>
        </div>

    );

  }

}

export default Bed;