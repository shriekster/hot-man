import React from 'react';
import Tippy from '@tippyjs/react';
import Spinner from './Spinner';

import Bed from './Bed';
 
class SpatiuAdd extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      
      loading: false,
      addingBed: false,

      etaj: '',
      numar: '',
      tip: '0',
      confort: '0',
      beds: [],

    };
  
    this.generateKey = this.generateKey.bind(this);

    this.input = this.input.bind(this);

    this.addBed = this.addBed.bind(this);

    this.removeBed = this.removeBed.bind(this);

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

      case 'numarPaturi': {

        let beds = this.state.beds;
        beds[e.target.dataset.index].numar = e.target.value;

        /** Check the state of the beds;
         * if any bed has incomplete data,
         * the user cannot add another bed
         */
        const isIncomplete = (bed) => 
          (bed.numar === '' || bed.tip === '0');

        let cannotAdd = beds.some(isIncomplete) ||
          // the types of added beds are the existing bed categories
          beds.length >= this.props.bedTypes.length;

        if (!cannotAdd) {

          this.setState({
            addingBed: false,
            beds: beds,
          });

        } else {

          this.setState({
            addingBed: true,
            beds: beds,
          });

        }
        
        break;
      }

      case 'tipPat': {

        let beds = this.state.beds;
        beds[e.target.dataset.index].tip = e.target.value;

        /** Check the state of the beds;
         * if any bed has incomplete data,
         * the user cannot add another bed
         */
        const isIncomplete = (bed) => 
          (bed.numar === '' || bed.tip === '0');

        let cannotAdd = beds.some(isIncomplete) ||
          // the types of added beds are the existing bed categories
          beds.length >= this.props.bedTypes.length;

        if (!cannotAdd) {

          this.setState({
            addingBed: false,
            beds: beds,
          });

        } else {

          this.setState({
            addingBed: true,
            beds: beds,
          });

        }

        break;
      }

    }

  }

  addBed() {

    if (!(this.state.addingBed ||
          (!this.state.etaj ||
           !this.state.numar ||
           this.state.tip === '0' ||
           this.state.confort === '0'))) {

      let beds = this.state.beds;

      beds.push({
        index: beds.length,
        numar: '',
        tip: '0',
      });

      this.setState((state, props) => ({
        addingBed: true,
        beds: beds,
      }));

    }

  }

  removeBed(index) {
    let beds = this.state.beds;

    if (index >= 0 && index < beds.length) {

      beds.splice(index, 1);

      // Reorder indexes
      for (let i = 0; i < beds.length; i++) {

        beds[i].index = i;
      }

      this.setState({

        addingBed: false,
        beds: beds,

      });

    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.state.beds, nextState.beds)
    if (this.state.beds.length === nextState.beds.length &&
        this.state.beds.length > 0) {
      return false;
    }

    return true;
  }

  render () {

    return (
      
      <div className='spatiu-add'>
        <div className='-space-add'>

          <div style={{width: '29px'}}></div>
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
          <div className='-space-add-beds-title'>
          <Tippy
            disabled={this.state.addingBed ||
              (!this.state.etaj ||
               !this.state.numar ||
               this.state.tip === '0' ||
               this.state.confort === '0')}
            content={
              <div>Adaugă pat</div>
            }
            allowHTML={true}
            placement='right'
            arrow={true}
            theme='material-confort-hints'
            hideOnClick={false}
            offset={[0, 20]}>
              <div className={
                this.state.addingBed ||
                (!this.state.etaj ||
                 !this.state.numar ||
                 this.state.tip === '0' ||
                 this.state.confort === '0')
                  ? '--add-beds-icon--disabled' 
                  :'--add-beds-icon'}
                onClick={this.addBed}>
                <i className='fas fa-bed --add-beds-icon-bed'></i>
                <i className='fas fa-plus --add-beds-icon-plus'></i>
              </div>
            </Tippy>
          </div>
          <div className='-space-add-beds-content'>
            {
              this.state.beds.map( bed => 

                <div className='--bed-data'
                  key={this.generateKey()}>

                  <div style={{width: '29px'}}></div>
                  <input className='-space-add-input'
                    style={{width: '30%'}}
                    data-type='numarPaturi'
                    data-index={`${bed.index}`}
                    type='text'
                    placeholder='numărul de paturi'
                    maxLength={16}
                    onInput={this.input}
                    value={bed.numar}>
                  </input>
                  
                  <div className='--bed-cell'>x</div>
        
                  <div className='-space-add-select-container'
                    style={{width: '30%'}}>
                    <select className='-space-add-select'
                      style={{color: bed.tip === '0'
                                    ? 'lightslategray'
                                    : 'darkslategray'}}
                      value={bed.tip}
                      data-type='tipPat'
                      data-index={`${bed.index}`}
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
                        onClick={() => this.removeBed(bed.index)}></i>
                    </Tippy>
                  </div>
                </div>

              )
            }
          </div>
        </div>

        <div className='-space-add-buttons-container'>
        <Tippy
          content={
            <div>Salvează</div>
          }
          allowHTML={true}
          placement='top'
          arrow={true}
          theme='material-confort-hints'
          hideOnClick={false}
          offset={[0, 10]}>
            <i className='fas fa-save -space-add-save'
              onClick={this.props.save}>
            </i>
          </Tippy>
          <Tippy
            content={
              <div>Renunţă</div>
            }
            allowHTML={true}
            placement='top'
            arrow={true}
            theme='material-confort-disabled'
            hideOnClick={false}
            offset={[0, 10]}>
            <i className='fas fa-window-close -space-add-cancel'
              onClick={this.props.cancel}>
            </i>
          </Tippy>
        </div>
      </div>

    );

  }

}

export default SpatiuAdd;