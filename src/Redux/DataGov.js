// Will be assumed the year will 4 digits at max
// We're going to get the year from the quarter field by substring instead of split function for efficiency
// Return: {data: [{year: <year>, total: <total>, decreasedQuarter: [<quarter>, ...], quarterly:[<vol>, <vol>, <vol>, <vol>]}, ...],
// uncompletedYear: [{year: <year>, total: <total>, decreasedQuarter: [<quarter>, ...], quarterly:[<vol>, <vol>, <vol>, <vol>]}, ...]}
export default function getAnnualData(records, lastUncompletedYear) {
  let data = [];
  let uncompletedYear = [];
  if (records && records.length > 0) {
    let year = lastUncompletedYear ? lastUncompletedYear.year : '';
    let total = lastUncompletedYear
      ? parseFloat(lastUncompletedYear.total)
      : 0.0;
    let lastQuarterVol =
      lastUncompletedYear && lastUncompletedYear.quarterly
        ? lastUncompletedYear.quarterly[
            lastUncompletedYear.quarterly.length - 1
          ]
        : 0;
    let decreasedQuarter = lastUncompletedYear
      ? lastUncompletedYear.decreasedQuarter
      : [];
    let quarterlyVol = lastUncompletedYear ? lastUncompletedYear.quarterly : [];
    for (let i = 0; i < records.length; i++) {
      year = records[i].quarter.substring(0, 4);
      let quarter = parseInt(records[i].quarter.substring(6), 10);
      let quarterVol = parseFloat(records[i].volume_of_mobile_data);

      total += quarterVol;
      if (lastQuarterVol > quarterVol) {
        decreasedQuarter.push(quarter);
      }
      lastQuarterVol = quarterVol;
      quarterlyVol[quarter - 1] = quarterVol;

      if (quarter === 4) {
        data.push({
          year: year,
          total: total.toFixed(6),
          decreasedQuarter: decreasedQuarter,
          quarterly: quarterlyVol,
        });

        total = 0;
        decreasedQuarter = [];
        // lastQuarterVol = 0;
        quarterlyVol = [];
      }
    }

    if (quarterlyVol.length > 0) {
      uncompletedYear.push({
        year: year,
        total: total.toFixed(6),
        decreasedQuarter: decreasedQuarter,
        quarterly: quarterlyVol,
      });
    }
  }

  return {data, uncompletedYear};
}
