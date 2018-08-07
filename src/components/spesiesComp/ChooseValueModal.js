/* eslint react/prop-types: 0 */
import React, {Component} from 'react';
import ReactList from 'react-list';

// REDUX
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as speciesActions from '../../state/actions/speciesActions';

const mapStateToProps = (state) => ({
    ...state.trait,
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...speciesActions}, dispatch)
    };
}

// COMPONENT

class ChooseValueModal extends Component {

    constructor (props) {
        super(props);
        this.state = {
            valueList: props.hasValue
        };
    }

    onClick = () =>{
        this.props.actions.changeSpValues('values', this.state.valueList, this.props.spId);
    }

    valueSel = (name)=> {
        if (this.state.valueList.includes(name)) {
            var temp = this.state.valueList;
            temp.splice(temp.indexOf(name),1);
            this.setState({
                valueList: temp
            });
        }else {
            this.setState({
                valueList: this.state.valueList.concat([name])
            });
        }
    }

    renderValues = (key) => {
        var ret = this.props.traitValueCombo[key].values.map((item) => {
            return(
                <div key= {key + item.valueId} className="form-check form-check-inline rowDivider">
                    <label className="form-check-label mr-3" htmlFor="spCheck">{item.valueText}</label>
                    <button type="button" className= " checkboxBtn" onClick = {this.valueSel.bind(this, item.valueId)}>
                        {this.state.valueList.includes(item.valueId) ?
                            <i className="far fa-check-square"/>
                            :
                            <i className="far fa-square"/>
                        }
                    </button>
                </div>
            );
        });
        return ret;
    }

    renderItem = (index, key) =>{
        return (
            <div key = {this.props.traitValueCombo[key].traitId} className ="col-12">
                <div className="col-3">
                    {this.props.traitValueCombo[key].traitText}
                </div>
                <div className="row">
                    <div className="col-1">
                    </div>
                    <div className="col-3">
                        {this.renderValues(key)}
                    </div>
                </div>
            </div>
        );
    }

    render () {
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center" id="exampleModalLongTitle">{'Velg verdier for ' + (this.props.art.length !== 0 ?  this.props.art + '.' : 'art.')}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.props.traitValueCombo.length < 1 || this.props.traitValueCombo.length == 1 && this.props.traitValueCombo[0].traitText == ''?
                            <div>Du har ingen verdier og velge.</div>
                            :
                            <ReactList
                                itemRenderer={this.renderItem}
                                length={this.props.traitValueCombo.length}
                                type='simple'
                            />
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Lukk</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick = {this.onClick}>Velg</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseValueModal);
