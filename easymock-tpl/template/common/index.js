<% _.forEach(config.projects, function(project){ %>import  {{$$.convertUrl(project.name)}} from './{{project.name}}/index';
<% }) %>

export default {<% _.forEach(config.projects, function(project, i){ %>
  {{$$.convertUrl(project.name)}}<% if(config.projects.length - 1 !== i) { %>,<% } %><% }) %>
};
