import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { accountActions } from '../../../../actions/index';
import SimpleBar from '../../../ui/SimpleBar';

import BasicInfo from './BasicInfo';
import BasicInfoEdit from './BasicInfoEdit';
import StudentInfo from './StudentInfo';
import StudentInfoEdit from './StudentInfoEdit';
import AccountDelete from './AccountDelete';
import NewPassword from './NewPassword';

const useStyles = (theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
});

/* This is a level 4 component (page component) */

class AccountSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: null,
      editBasicInfo: false,
      editStudInfo: false,
      realName: '',
      userName: '',
      nickName: '',
      altMail: '',
      cards: [],
    };
    this.handleBasicEdit = this.handleBasicEdit.bind(this);
    this.handleBasicBack = this.handleBasicBack.bind(this);
    this.setBasicInfo = this.setBasicInfo.bind(this);
    this.handleStudBack = this.handleStudBack.bind(this);
    this.handleStudEdit = this.handleStudEdit.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  componentDidMount() {
    const { accountId } = this.props.match.params;
    console.log('hello', this.props.accounts);
    const account = this.props.accounts[accountId];
    this.setState({
      accountId,
      realName: account.real_name,
      userName: account.username,
      nickName: account.nickname,
      altMail: account.alternative_email,
    });

    account.studentCard.forEach((cardId) => {
      this.setState((prevState) => ({ cards: [...prevState.cards, this.props.studentCards[cardId]] }));
    });
  }

  componentDidUpdate(prevProps) {
    const { accountId } = this.props.match.params;
    // console.log(this.props.studentCards);
    // console.log(prevProps.studentCards);
    // console.log('rerender');
    if (this.props.studentCards !== prevProps.studentCards) {
      // console.log('refetch');
      const account = this.props.accounts[accountId];
      account.studentCard.forEach((cardId) => {
        this.setState((prevState) => ({ cards: [...prevState.cards, this.props.studentCards[cardId]] }));
      });
    }
  }

  setBasicInfo = (newRealName, newUserName, newNickName, newAltMail) => {
    this.setState({
      realName: newRealName,
      userName: newUserName,
      nickName: newNickName,
      altMail: newAltMail,
    });
  };

  handleBasicEdit = () => {
    this.setState({
      editBasicInfo: true,
    });
  };

  handleBasicBack = () => {
    this.setState({
      editBasicInfo: false,
    });
  };

  updateStatus = (updated) => {
    this.setState({
      datas: updated,
    });
  };

  handleStudEdit = () => {
    this.setState({
      editStudInfo: true,
    });
  };

  handleStudBack = () => {
    this.setState({
      editStudInfo: false,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Typography variant="h3" className={classes.pageHeader}>
          {this.state.userName}
          {' '}
          / Setting
        </Typography>

        {/* {this.props.accounts && console.log(this.props.accounts)} */}
        {this.state.editBasicInfo ? (
          <BasicInfoEdit
            handleBack={this.handleBasicBack}
            realName={this.state.realName}
            setBasicInfo={this.setBasicInfo}
            userName={this.state.userName}
            nickName={this.state.nickName}
            altMail={this.state.altMail}
          />
        )
          : (
            <BasicInfo
              handleEdit={this.handleBasicEdit}
              realName={this.state.realName}
              userName={this.state.userName}
              nickName={this.state.nickName}
              altMail={this.state.altMail}
            />
          )}
        {this.state.editStudInfo ? (
          <StudentInfoEdit
            handleBack={this.handleStudBack}
            cards={this.state.cards}
            updateStatus={this.updateStatus}
          />
        ) : (
          <StudentInfo
            handleEdit={this.handleStudEdit}
            cards={this.state.cards}
          />
        )}

        <NewPassword />
        <AccountDelete
          userName={this.state.userName}
          cards={this.state.cards}
          realName={this.state.realName}
        />
      </>
    );
  }
}

const mapStateToProps = (store) => (
  {
    accounts: store.admin.account.accounts.byId,
    studentCards: store.admin.account.studentCards.byId,
    studentCardsId: store.admin.account.studentCards.allId,
  }
);

export default connect(mapStateToProps, accountActions)(withStyles(useStyles)(AccountSetting));

// export default function AccountSetting() {
//   const [accountid, setAccountid] = useState(null);
//   const [editBasicInfo, setEditBasicInfo] = useState(false);
//   const [editStudInfo, setEditStudInfo] = useState(false);
//   const [realName, setRealName] = useState('');
//   const [userName, setUserName] = useState('');
//   const [nickName, setNickName] = useState('');
//   const [altMail, setAltMail] = useState('');
//   const [cards, setCards] = useState([]);
//   const classes = useStyles();

//   const { accountId } = useParams();
//   const accounts = useSelector((state) => state.admin.account.accounts.byId);
//   const studentCards = useSelector((state) => state.admin.account.studentCards.byId);

//   useEffect(() => {
//     const account = accounts[accountId];
//     setAccountid(accountId);
//     setRealName(account.real_name);
//     setUserName(account.username);
//     setNickName(account.nickname);
//     setAltMail(account.alternative_email);
//     account.studentCard.forEach((cardId) => {
//       setCards((prevState) => ([...prevState.cards, studentCards[cardId]]));
//     });
//   }, [accountId, accounts, studentCards]);
//   return (
//     <div>
//       {accountId}
//       {realName}
//       {cards}
//     </div>
//   );
// }
