import PropTypes from 'prop-types'

const Notification = (props) => {
    if (props.message === "") {
        return null
    }

    return (
        <div>
            {(props.isError) ? (
                <div className="error">
                    {props.message}
                </div>
            ) : (
                <div className="success">
                    {props.message}
                </div>
            )}
        </div>
    )
}

Notification.propTypes = {
    isError: PropTypes.bool,
    message: PropTypes.string
}

export default Notification