// JobProgress
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
const JobProgressChart = () => {
  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      applications: 85,
      limit: 200,
      deadline: '2025-06-01',
      status: 'Open',
    },
    {
      id: 2,
      title: 'Backend Developer',
      applications: 80,
      limit: 120,
      deadline: '2025-06-15',
      status: 'Open',
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      applications: 50,
      limit: 50,
      deadline: '2025-05-25',
      status: 'Closed',
    },
  ];
  const [selectedJobId, setSelectedJobId] = useState(jobs[0].id);
  const selectedJob = jobs.find((job) => job.id === selectedJobId);
  const percent = Math.min((selectedJob.applications / selectedJob.limit) * 100, 100);
  const statusColor =
    selectedJob.status.toLowerCase() === 'closed'
      ? '#013B63' // dark blue
      : '#01ABE8'; // light blue 
  const data = {
    datasets: [
      {
        data: [percent, 100 - percent],
        backgroundColor: [statusColor, '#e0e0e0'],
        borderWidth: 0,
        cutout: '75%',
      },
    ],
  };
  const options = {
    cutout: '75%',
    responsive: true,
    animation: {
      animateRotate: true,
      duration: 1000,
      easing: 'easeOutBounce',
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: () =>
            `${selectedJob.applications} of ${selectedJob.limit} applications`,
        },
      },
    },
  };

  return (
    <div
      className='shadow px-5'
      style={{
        maxWidth: '470px',
        minHeight:'400px',
        margin: 'auto',
        textAlign: 'center',
        fontFamily: 'Arial',
      }}
    >
      <h6>Application Progress</h6>
      {/* Dropdown */}
      <select
        value={selectedJobId}
        onChange={(e) => setSelectedJobId(Number(e.target.value))}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}>
        {jobs.map((job) => (
          <option key={job.id} value={job.id}>
            {job.title}
          </option>
        ))}
      </select>
      {/* Job Info */}
      <div style={{ marginBottom: '10px' }}>
        <strong>Status:</strong>{' '}
        <span  className ="fw-bold" style={{ color: statusColor }}>{selectedJob.status}</span> <br />
        <strong>Deadline:</strong> {selectedJob.deadline}<br/>
        <strong>Applications:</strong> {selectedJob.applications}

      </div>
      {/* Gauge Chart with Center Label */}
      <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto' }}>
        <Doughnut data={data} options={options} />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '24px',
            fontWeight: 'bold',
            color: statusColor,
          }}
        >
          {Math.round(percent)}%
        </div>
      </div>
    </div>
  );
};
export default JobProgressChart;
