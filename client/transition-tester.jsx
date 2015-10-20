const Base = React.createClass({
  render() {
    return <h1>Base</h1>;
  }
});

const Layout = React.createClass({
  render() {
    return (
      <div id="layout">
        {this.props.children}
      </div>
    );
  }
});

const AppLayout = React.createClass({
  render() {
    return (
      <div id="app-layout">
        {this.props.children}
      </div>
    );
  }
});

const OrgLayout = React.createClass({
  render() {
    return (
      <div id="org-layout">
        {this.props.children}
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

const componentList = new ReactiveVar([Base]);

App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      components: componentList.get()
    };
  },
  render() {
    const components = this.data.components;
    const renderOnce = (index) => {
      const Component = components[index];
      if (index === components.length - 1) {
        return <Component/>;
      } else {
        return <Component>{renderOnce(index+1)}</Component>;
      }
    }

    return renderOnce(0);
  }
});

window.goToBase = () => {
  componentList.set([Base]);
};

window.goToLogin = () => {
  componentList.set([Layout, Login]);
};

window.goToAppShow = () => {
  componentList.set([Layout, AppLayout, AppShow]);
};

window.goToOrgAppList = () => {
  componentList.set([Layout, OrgLayout, OrgAppList]);
};

window.goToOrgUserList = () => {
  componentList.set([Layout, OrgLayout, OrgUserList]);
};

Meteor.startup(function() {
  React.render(<App/>, document.getElementById('render-target'));
});