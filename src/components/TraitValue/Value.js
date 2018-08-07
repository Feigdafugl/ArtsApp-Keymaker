/* eslint react/prop-types: 0 */
import React, {Component} from 'react';
import Input from '../shared/Input';
import DeleteDialog from '../shared/DeleteDialog';

// REDUX
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as traitActions from '../../state/actions/traitActions';

const mapStateToProps = (state) => ({
    ...state.trait,
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...traitActions}, dispatch)
    };
}

// COMPONENT

class Value extends Component {

    constructor (props) {
        super(props);
        this.state = {
            images: [],
            value:'',
            valueInfo: '',
        };
    }

    delete = () => {
        console.log('her2');
        this.props.actions.removeValue(this.props.traitID, this.props.value.valueId);
    }

    render () {
        return (
            <div className = "rowDivider col-11 py-2">
                <div className = "row " >
                    <div className="col-1 row divider text-center " >
                        <h2 className = "valueNumber">{this.props.index}</h2>
                    </div>
                    <div className= "col-11 row pl-4">
                        <div className="col-lg-6 col-md-12 ">
                            <Input
                                name= "valueText"
                                inputType="popup"
                                type ="value"
                                label = "Verdi"
                                value ={this.props.value.valueText}
                                traitID = {this.props.traitID}
                                typeID = {this.props.value.valueId} />
                            <Input
                                name= "images"
                                inputType="image"
                                type ="value"
                                label = "Bilder:"
                                value = {this.props.value.images}
                                typeID = {this.props.value.valueId}
                                traitID = {this.props.traitID}/>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <Input
                                name= "valueInfo"
                                inputType="textarea"
                                value ={this.props.value.valueInfo}
                                type ="value"
                                label = "Beskrivelse"
                                traitID = {this.props.traitID}
                                typeID = {this.props.value.valueId} />
                        </div>
                    </div>
                </div>
                <div className="modal fade" id={'deleteDialogV' +this.props.value.valueId} tabIndex="-1" role="dialog" aria-labelledby={'deleteDialogV' +this.props.value.valueId} aria-hidden="true">
                    <DeleteDialog  type= "value" onDialogClick = {this.delete}/>
                </div>
                <button type="button" className= " setFocus delIcon"  data-toggle="modal"  data-target={'#deleteDialogV' +this.props.value.valueId} >
                    <i className="far fa-trash-alt "/>
                </button>
            </div>
        );
    }


}


export default connect(mapStateToProps, mapDispatchToProps)(Value);
