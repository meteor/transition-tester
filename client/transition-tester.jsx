const Base = React.createClass({
  render() {
    return <h1>Base</h1>;
  }
});

const Layout = React.createClass({
  render() {
    return (
      <div id="layout">
        <h2>Galaxy Layout</h2>
        {this.props.children}
      </div>
    );
  }
});

const AppLayout = React.createClass({
  render() {
    return (
      <div id="app-layout">
        <h2>App Layout</h2>
        {this.props.children}
      </div>
    );
  }
});

const OrgLayout = React.createClass({
  render() {
    return (
      <div id="org-layout">
        <h2>Org Layout</h2>
        <div className="contents">
          {this.props.children}
        </div>
      </div>
    );
  }
});

const Login = React.createClass({
  render() {
    return <h1>Login</h1>;
  }
});

const AppShow = React.createClass({
  render() {
    return <h1>AppShow</h1>;
  }
});

const OrgAppList = React.createClass({
  render() {
    return <h1>OrgAppList</h1>;
  }
});

const OrgUserList = React.createClass({
  render() {
    return <h1>OrgUserList</h1>;
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
          <div className="transitioning">
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
          return <Component>{renderListsFrom(index+1, which)}</Component>;
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