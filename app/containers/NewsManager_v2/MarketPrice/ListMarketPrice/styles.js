const styles = {
    wrapcontent: {
        width: '100%',
        height: '100%',
    },
    inlineWrapContent:{
        width: '90%',
        margin: 'auto',
        background: '#FFF',
        boxShadow: '1px 1px 3px #b7b7b7',
    },
    header:{
        display: 'flex',
        padding: '10px 15px',
        borderBottom: '1px solid #616161',
        backgroundColor: '#FAFAFA',
        fontSize: 16,
        fontWeight: 600,
        flexDirection: 'row',
    },
    content: {
        padding: '10px 15px',
    },
    loading: {
        width: '100%',
        height: '100%',
        position: "fixed",
        top: 0,
        left: 0,
        background: '#5d5d5d20',
        padding: 60,
        zIndex: 1200,
        textAlign: 'center',
    },
}

export default styles;