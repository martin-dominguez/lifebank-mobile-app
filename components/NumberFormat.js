import PropTypes from 'prop-types';

function NumberFormat(props) {
    const {
		value = 0.0,
		sufix = '',
		prefix = '',
		format = 'EU', // values: EU or US
		thousandSeparator = true,
    } = props;
    
    let finalValue = typeof value ==='string' ? parseFloat(value) : value;
    let thousandSymbol = format === "EU" ? "." : ",";
    let floatValue = format === "EU" ? finalValue.toFixed(2).replace(".",",") : finalValue.toFixed(2);

    return thousandSeparator ?
        prefix + floatValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + thousandSymbol) + sufix :
        prefix + floatValue + sufix;
}


NumberFormat.propTypes = {
	value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
	sufix: PropTypes.string,
	prefix: PropTypes.string,
    format: PropTypes.string,
    thousandSeparator: PropTypes.bool,
};

export default NumberFormat;