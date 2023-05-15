import StudentsPicker from '../components/StudentsPicker';
import StudentsTable from '../components/StudentsTable';
import { fetchStudentData, fetchSchoolData, fetchLegalguardianData } from '../utils';
import { useState, useEffect } from 'react';

const studentsDataComponent = () => {
    const [studentsData, setStudentsData] = useState([]);
    const [schoolsData, setSchoolsData] = useState([]);
    const [legalguardiansData, setLegalguardiansData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const newStudentsData = [];
            const newSchoolsData = [];
            const newLegalguardiansData = [];

            for (const student of studentsData) {
                const { schoolId, legalguardianId } = student;

                // Check if school data already exists in schoolsData state variable
                let schoolData = schoolsData.find(school => school.id === schoolId);
                if (!schoolData) {
                    schoolData = await fetchSchoolData(schoolId);
                    newSchoolsData.push(schoolData);
                }

                // Check if legalguardian data already exists in legalguardiansData state variable
                let legalguardianData = legalguardiansData.find(legalguardian => legalguardian.id === legalguardianId);
                if (!legalguardianData) {
                    legalguardianData = await fetchLegalguardianData(legalguardianId);
                    newLegalguardiansData.push(legalguardianData);
                }

                newStudentsData.push({
                    ...student,
                    schoolData,
                    legalguardianData
                });
            }

            setSchoolsData([...schoolsData, ...newSchoolsData]);
            setLegalguardiansData([...legalguardiansData, ...newLegalguardiansData]);
            setStudentsData([...studentsData, ...newStudentsData]);
        };

        fetchData();
    }, [studentsData, schoolsData, legalguardiansData]);

    const onStudentsPick = async (studentIds) => {
        const students = await Promise.all(studentIds.map(id => fetchStudentData(id)));
        setStudentsData([...studentsData, ...students]);
    };

    return (
        <>
            <StudentsPicker onPickHandler={onStudentsPick} />
            <StudentsTable
                studentsData={studentsData}
                schoolsData={schoolsData}
                legalguardiansData={legalguardiansData}
            />
        </>
    );
};

export default studentsDataComponent;
