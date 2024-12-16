import React, { useState, useEffect, useRef } from 'react';
import DataTable from './components/DataTable';
import DataChart from './components/DataChart';

function App() {
  const [data, setData] = useState([]);

  // Filter states
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedDevice, setSelectedDevice] = useState('All');
  const [signalStrengthRange, setSignalStrengthRange] = useState([0, 100]);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Shared state for rows per page
  const [isRealTime, setIsRealTime] = useState(true);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/data');
        let newData = await response.json();
        setData((prev) => {
          const updatedData = [...prev, ...newData]; // Append new data
          return updatedData; // If length <= 500, return as is
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate total pages whenever data changes
  useEffect(() => {
    setTotalPages(Math.ceil(data.length / rowsPerPage));

    if (isRealTime) {
      setCurrentPage(Math.ceil(data.length / rowsPerPage));
    }
  }, [data, rowsPerPage]);


  
  // Pagination handlers
  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    setIsRealTime(false);
  }

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    setIsRealTime(false);
  }

  const moveToEnd = () => {
    setIsRealTime(true);
  }

  const filteredData = data.filter((entry) => {
    const locationMatches = selectedLocation === 'All' || entry.location === selectedLocation;
    const deviceMatches = selectedDevice === 'All' || entry.deviceId === selectedDevice;
    const signalStrengthMatches =
      entry.signalStrength >= signalStrengthRange[0] && entry.signalStrength <= signalStrengthRange[1];
    return locationMatches && deviceMatches && signalStrengthMatches;
  });

  // Pagination logic for filtered data
  const columns = [
    { key: 'id', header: 'ID' },
    {
      key: 'timestamp',
      header: 'Timestamp',
      render: (value) => new Date(value).toLocaleString(),
    },
    { key: 'deviceId', header: 'Device ID' },
    { key: 'frequency', header: 'Frequency (Hz)', render: (value) => value.toFixed(2) },
    { key: 'signalStrength', header: 'Signal Strength (%)', render: (value) => value.toFixed(2) },
    { key: 'location', header: 'Location' },
  ];

  const onRowHighlight = (row) => row.signalStrength < 20;

  return (
    <div className='w-full h-full'>
      <div className="container mx-auto p-2 md:p-4 xl:p-8">
        <div className='flex flex-col items-center space-y-4 mb-4'>
          <h1 className='text-base sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl mt-12 md:mt-4 font-bold'>Frequency Monitoring Dashboard</h1>

          {/* Filter Controls */}
          <div className='flex mb-4 space-y-4 xl:space-y-0 space-x-0 xl:space-x-8 items-center justify-center flex-col xl:flex-row'>
            {/* Location Filter */}
            <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              <option value="All">All Locations</option>
              {[...new Set(data.map((d) => d.location))].map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            {/* Device ID Filter */}
            <select value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)}>
              <option value="All">All Devices</option>
              {[...new Set(data.map((d) => d.deviceId))]
                .sort((a, b) => {
                  const numA = parseInt(a.match(/\d+/)?.[0] || 0, 10); // Extract numeric part of 'device-1'
                  const numB = parseInt(b.match(/\d+/)?.[0] || 0, 10); // Extract numeric part of 'device-10'
                  return numA - numB; // Sort numerically
                })
                .map((deviceId) => (
                  <option key={deviceId} value={deviceId}>
                    {deviceId}
                  </option>
                ))}
            </select>

            {/* Signal Strength Range Filter */}
            <div className='flex space-y-2 md:space-y-0 space-x-0 md:space-x-2 flex-col md:flex-row justify-center items-center'>
              <label>Signal Strength: </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={signalStrengthRange[0]}
                onChange={(e) => setSignalStrengthRange([+e.target.value, signalStrengthRange[1]])}
              />
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={signalStrengthRange[1]}
                onChange={(e) => setSignalStrengthRange([signalStrengthRange[0], +e.target.value])}
              />
              <span>
                {signalStrengthRange[0]}% - {signalStrengthRange[1]}%
              </span>
            </div>

            {/* RowsPerPage Control */}
            <div>
              <label htmlFor="rowsPerPage">Rows per page: </label>
              <select
                id="rowsPerPage"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))} // Update rowsPerPage dynamically
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
              </select>
            </div>

            
            <button className='text-xs md:text-sm lg:text-base' onClick={moveToEnd}>
              Continue
            </button>
          </div>
        </div>

        <div className='mt-0 md:mt-4 flex justify-between items-center mb-8'>
          <button className='text-xs md:text-sm lg:text-base' onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span className='text-xs md:text-sm lg:text-base'>
            Page {currentPage} of {totalPages}
          </span>
          <button className='text-xs md:text-sm lg:text-base' onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

        <div className='flex flex-col-reverse'>
          <div className='mt-8 md:mt-16'>
            <DataTable
              data={filteredData}
              columns={columns}
              onRowHighlight={onRowHighlight}
              rowsPerPage={rowsPerPage} // Customize the number of rows per page
              currentPage={currentPage}
              isRealTime={isRealTime}
            />
          </div>

          <div className='mt-2 md:mt-8'>
            <DataChart
              data={filteredData}
              rowsPerPage={rowsPerPage}
              currentPage={currentPage}
              isRealTime={isRealTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;