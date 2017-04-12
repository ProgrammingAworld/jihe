import React from 'react';

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        let value = event.target.value;
        this.props.onChange(value);
    }

    render() {
        let {onChange, type, className, value, ...other} = this.props;
        type = type ? type : 'text';
        className = className ? className : 'form-input form-control';
        value = value != null ? value : '';
        switch (type) {
            case 'number':
                return (
                    <NumberInput {...this.props}/>
                );
            default:
                return (
                    <input type={type} className={className} value={value} onChange={this.onChange} {...other}/>
                );
        }
    }
}

class NumberInput extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(event) {
        let value = event.target.value;
        this.props.onChange(value);
    }

    onBlur(event) {
        let value = event.target.value;
        if(value == "") {
            value = null;
        } else {
            value = Number(value);
        }
        this.props.onChange(value);
    }

    render() {
        let {onChange, type, className, value, ...other} = this.props;
        type = type ? other.type : 'text';
        className = className ? className : 'form-input form-control';
        value = value != null ? value : '';
        return (
            <input type="number" className={className} value={value} onChange={this.onChange} onBlur={this.onBlur} {...other}/>
        )
    }
}

class Textarea extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        let value = event.target.value;
        this.props.onChange(value);
    }

    render() {
        let {onChange, className, value, ...other} = this.props;
        className = className ? className : 'form-input form-control';
        value = value != null ? value : '';
        return (
            <textarea className={className} onChange={this.onChange} value={value}/>
        )
    }

}

class Select extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    getItemViews(datas) {
        return _.map(datas, function(item) {
            let key, value;
            if(typeof item === 'object') {
                value = item.value;
                key = item.key != null ? item.key : item.value;
            } else {
                value = item;
                key = item;
            }
            return (
                <option key={key} value={key.toString()}>{value}</option>
            )
        });
    }

    onChange(event) {
        let value = event.target.value;
        let {onChange, valueType} = this.props;
        valueType = valueType ? valueType : 'string';
        value = value == '' ? null : value;
        if(value) {
            switch (valueType.toLowerCase()) {
                case 'number':
                    value = Number(value);
                    break;
                case 'boolean':
                    value = value == 'true' ? true : false;
                    break;
                default:
                    // do nothing
            }
        }
        if(typeof onChange === 'function') {
            onChange(value);
        }
    }

    render() {
        let {datas, className, value, valueType, onChange, placeholder, ...other} = this.props;
        placeholder = placeholder != null ? placeholder : '----请选择----'
        className = className ? className : 'form-input form-control';
        datas = datas ? datas : [];
        valueType = valueType ? valueType : 'string';
        value = value != null ? value.toString() : '';
        let itemViews = this.getItemViews(datas);
        return (
            <select className={className} value={value} {...other} onChange={this.onChange}>
                <option value="">{placeholder}</option>
                {itemViews}
            </select>
        )
    }

}

/**
 * props: value         Array
 *        valueType     String      'String' or 'Number' or 'Boolean'
 *        itemDatas     Array
 *        onChange      Function
 *        inline        String      optional    true
 *        keyName     String
 *        valueName     String
 */
class CheckboxGroup extends React.Component{

    constructor(props) {
        super(props);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.getItemViews = this.getItemViews.bind(this);
    }

    handleItemChange(event) {
        let checked = event.target.checked,
            value = event.target.value,
            valueType = this.props.valueType ? this.props.valueType : "String",
            groupValue = this.props.value ? this.props.value : [],
            onChangeCallback = this.props.onChange;
        switch(valueType) {
            case "String":
                value = value.length > 0 ? value : null;
                break;
            case "Number":
                value = value.length > 0 ? Number(value) : null;
                break;
            case "Boolean":
                value = value == "true";
                break;
            default:
                throw new Error("不支持的数据类型:" + valueType);
        }
        if (checked) {
            groupValue = _.union(groupValue, [value]);
        } else {
            groupValue = _.without(groupValue, value);
        }
        if (typeof onChangeCallback === 'function') {
            onChangeCallback(groupValue);
        }
    }

    getItemViews(data, inline) {
        let {keyName, valueName} = this.props,
            _this = this,
            name = "checkbox" + _.uniqueId(),
            groupValue = this.props.value != null ? this.props.value : [],
            labelClass = inline ? 'checkbox-inline' : 'checkbox';
        keyName = keyName ? keyName : 'key';
        valueName = valueName ? valueName : 'value';
        return _.map(data, function (item) {
            let value = item[valueName],
                key = item[keyName],
                checked = _.indexOf(groupValue, key) > -1;
            return (
                <label key={value} className={labelClass}>
                    <input type="checkbox" value={key.toString()} name={name}
                           checked={checked}
                           onChange={_this.handleItemChange}
                    />
                    {value}
                </label>
            )
        });
    }

    render() {
        let {datas, inline} = this.props;
        datas = datas ? datas : [];
        inline = inline != null ? inline : true;
        let itemViews = this.getItemViews(datas, inline)
        return (
            <div className="checkbox-group-container">
                {itemViews}
            </div>
        );
    }
}

class RadioGroup extends React.Component{

    constructor(props) {
        super(props);
        this.getRadioView = this.getRadioView.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getRadioView(inline, value, key, name) {
        let checked = this.props.value != null ? this.props.value == key: false,
            labelClass = inline ? 'radio-inline' : 'radio';
        return (
            <label key={key.toString()} className={labelClass}>
                <input name={name} type="radio" value={key.toString()} checked={checked}
                       onChange={this.handleChange}/>
                {value}
            </label>
        );
    }

    getValue(value, valueType) {
        valueType = this.props.valueType ? this.props.valueType : "string";
        switch(valueType.toLowerCase()) {
            case "string":
                value = value.length > 0 ? value : null;
                break;
            case "number":
                value = value.length > 0 ? Number(value) : null;
                break;
            case "boolean":
                value = value == "true";
                break;
            default:
                throw new Error("不支持的数据类型:" + valueType);
        }
        return value;
    }

    handleChange(event) {
        let value = event.target.value,
            valueType = this.props.valueType ? this.props.valueType : "string",
            onChangeCallback = this.props.onChange;
        switch(valueType.toLowerCase()) {
            case "string":
                value = value.length > 0 ? value : null;
                break;
            case "number":
                value = value.length > 0 ? Number(value) : null;
                break;
            case "boolean":
                value = value == "true";
                break;
            default:
                throw new Error("不支持的数据类型:" + valueType);
        }
        if(typeof onChangeCallback === 'function') {
            onChangeCallback(value);
        }
    }

    render() {
        let _this = this,
            itemDatas = this.props.datas ? this.props.datas : [],
            inline = this.props.inline != null ? this.props.inline : true,
            visible = this.props.visible != null ? this.props.visible : true,
            itemViews,
            containerClass = "radio-group-container",
            name = this.props.name ? this.props.name : "radio" + _.uniqueId(),
            valueName = this.props.valueName ? this.props.valueName : 'value',
            keyName = this.props.keyName ? this.props.keyName : 'key';
        containerClass = visible ? containerClass : containerClass + " hide";
        itemViews = _.map(itemDatas, function (item) {
            return _this.getRadioView(inline, item[valueName], item[keyName], name)
        });
        return (
            <div className={containerClass}>
                {itemViews}
            </div>
        );
    }
}

class Checkbox extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        let value = event.target.checked;
        this.props.onChange(value);
    }

    render() {
        let {value, onChange, ...other} = this.props;
        return (
            <input type="checkbox" value={value} onChange={this.onChange} {...other}/>
        )
    }
}


class FormField extends React.Component {

    render() {
        let {itemClass, label, labelClass, error, errorClass, children, hide} = this.props;
        itemClass = itemClass ? itemClass : 'form-group';
        itemClass = hide ? itemClass + ' hide' : itemClass;
        labelClass = labelClass ? labelClass : 'control-label col-sm-2';
        errorClass = errorClass ? errorClass : 'form-error';
        return (
            <div className={itemClass}>
                <div className="clearfix">
                    <label className={labelClass}>{label}</label>
                    <div className="input-container col-sm-8">
                        {children}
                        <div className={errorClass}>{error}</div>
                    </div>
                </div>
                <div className="hr-line-dashed"></div>
            </div>
        )
    }

    static Input = Input;

    static Number = NumberInput;

    static Textarea = Textarea;

    static Select = Select;

    static CheckboxGroup = CheckboxGroup;

    static RadioGroup = RadioGroup;

    static Checkbox = Checkbox;
}

export default FormField;