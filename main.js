document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  // -- checking description box empty or not
  if (description === '') {
    alert('Please write your problem.');
    return;
  }
  const severity = getInputValue('issueSeverity');
  let assignedTo = getInputValue('issueAssignedTo');
  // -- checking assigned to empty or not
  if (assignedTo === '') {
    const assignedTo = prompt('Please write who will solve this problem');
    if (!assignedTo) {
      return;
    }
  }
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  console.log(description, severity, assignedTo, id, status);

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const setStatusClosed = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  let currentIssue;
  issues.forEach(issue => {
    if (issue.id * 1 === id) {
      currentIssue = issue;
    }
  });
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  console.log(issues);
  if (issues) {
    for (let i = 0; i < issues.length; i++) {
      if (issues[i].id * 1 === id) {
        issues.splice(i, 1);
        break;
      }
    }
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  if (issues) {
    for (let i = 0; i < issues.length; i++) {
      const { id, description, severity, assignedTo, status } = issues[i];

      issuesList.innerHTML += `<div class="well">
                                <h6>Issue ID: ${id} </h6>
                                <p><span class="label label-info"> ${status} </span></p>
                                <h3> ${description} </h3>
                                <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                                <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                                ${status === 'Open' ? `<a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>` : ''}
                                <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                                </div>`;
    }
  }
}
