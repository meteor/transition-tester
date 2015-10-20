const Base = React.createClass({
  render() {
    return (
      <div id="loading-layout">
        <header>Loading</header>
      </div>
    );
  }
});

const Layout = React.createClass({
  render() {
    return (
      <div id="galaxy-layout">
        <div className="nav">Galaxy Layout Nav</div>
        {this.props.children}
      </div>
    );
  }
});

const AppLayout = React.createClass({
  render() {
    return (
      <div id="app-sublayout">
        <header>App Layout</header>
        {this.props.children}
      </div>
    );
  }
});

const OrgLayout = React.createClass({
  render() {
    return (
      <div id="org-sublayout">
        <header>Org Layout</header>
        <div className="contents">
          {this.props.children}
        </div>
      </div>
    );
  }
});

const Login = React.createClass({
  render() {
    return (
      <div id="login-sublayout">
        <header>Login</header>
      </div>
    );
  }
});

const AppShow = React.createClass({
  render() {
    return <h1>AppShow</h1>;
  }
});

const OrgAppList = React.createClass({
  render() {
    return <div className="microlayout">OrgAppList</div>;
  }
});

const OrgUserList = React.createClass({
  render() {
    return <div className="microlayout">OrgUserList</div>;
  }
});

const currentList = new ReactiveVar([Base]);
const newList = new ReactiveVar([Base]);
const state = new ReactiveVar('atCurrent');

App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      currentList: currentList.get(),
      newList: newList.get(),
      state: state.get()
    };
  },
  render() {
    const {currentList, newList, state} = this.data;

    const renderListsFrom = (index, which) => {
      const CurrentComponent = currentList[index];
      const NewComponent = newList[index];

      if (which === 'both' && CurrentComponent !== NewComponent) {
        // render the two components side by side
        return (
          <div className="transitioning transition-wrapper">
            <CurrentComponent key="current">{renderListsFrom(index+1, 'current')}</CurrentComponent>
            <NewComponent key="new">{renderListsFrom(index+1, 'new')}</NewComponent>
          </div>
        );
      } else {
        const list = (which === 'new') ? newList : currentList;
        Component = list[index];
        if (!Component) {
          return <div/>;
        } else {
          return (
            <div className="transitioning">
              <Component>{renderListsFrom(index+1, which)}</Component>
            </div>
          );
        }
      }
    }

    return renderListsFrom(0, state === 'transitioning' ? 'both' : 'current');
  }
});

_.extend(window, {
  pages: {
    Base: [Base],
    Login: [Layout, Login],
    AppShow: [Layout, AppLayout, AppShow],
    OrgUserList: [Layout, OrgLayout, OrgUserList],
    OrgAppList: [Layout, OrgLayout, OrgAppList]
  },
  goToPage(page) {
    newList.set(page);
    state.set('transitioning');
  },
  finishTransition() {
    currentList.set(newList.get());
    newList.set([]);
    state.set('atCurrent');
  }
})

Meteor.startup(function() {
  React.render(<App/>, document.getElementById('render-target'));
});
