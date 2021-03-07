import React from 'react';
import Tippy from '@tippyjs/react';
  
class SpatiuButtons extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      
      saveDisabled: true,

    };

    this.updateState = this.updateState.bind(this);

  }
 
  updateState(disabled) {

    this.setState((state, props) => ({

      saveDisabled: disabled,

    }));

  }
 
  render () {

    return (
      
        <div className='-space-add-buttons-container'>
          <Tippy
            disabled={this.state.saveDisabled}
            content={
              <div>Salvează</div>
            }
            allowHTML={true}
            placement='top'
            arrow={true}
            theme='material-confort-hints'
            hideOnClick={false}
            offset={[0, 10]}>
            {
              this.state.saveDisabled   ?
                <i className='fas fa-save -space-add-save--disabled'>
                </i>
                                        :
                <i className='fas fa-save -space-add-save'
                  onClick={() => {this.props.save(this.props.operationType)}}>
                </i>
            }
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
        
    );

  }

}

export default SpatiuButtons;