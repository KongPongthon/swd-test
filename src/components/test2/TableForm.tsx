import React, { useState } from 'react';
import { Table, Button, Checkbox } from 'antd';
import { RootState } from '@/store/store';
import { FormState } from '@/store/formSlice';
import { updateForm } from '@/store/formSlice';
import { deleteUser } from '@/store/userListSlice';
import i18next from 'i18next';
import styles from './Table.module.css';
import { useDispatch, useSelector } from 'react-redux';
const UserTable: React.FC = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.userList.users);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const genderOptionObj = i18next.t('genders', {
    returnObjects: true,
  }) as Record<string, string>;

  const nationOptionObj = i18next.t('nationalityOption', {
    returnObjects: true,
  }) as Record<string, string>;

  const handleDelete = (data: FormState) => {
    dispatch(deleteUser(data.id!));
  };

  const handleDeleteArray = (data: React.Key[]) => {
    data.forEach((d) => {
      dispatch(deleteUser(d as string));
    });
  };

  const handleEdit = (data: FormState) => {
    // console.log('data', data);

    dispatch(updateForm(data));
  };

  const columns = [
    {
      title: i18next.t('name'),
      render: (record: FormState) => `${record.firstname} ${record.lastname}`,
      sorter: (a: FormState, b: FormState) =>
        `${a.firstname} ${a.lastname}`.localeCompare(
          `${b.firstname} ${b.lastname}`
        ),
    },
    {
      title: i18next.t('gender'),
      dataIndex: 'gender',
      render: (value: string) => genderOptionObj[value] || value,
      sorter: (a: FormState, b: FormState) =>
        `${a.gender} ${a.gender}`.localeCompare(`${b.gender} ${b.gender}`),
    },
    {
      title: i18next.t('mobile'),
      dataIndex: 'mobile',
      sorter: (a: FormState, b: FormState) =>
        `${a.mobile} ${a.mobile}`.localeCompare(`${b.mobile} ${b.mobile}`),
    },

    {
      title: i18next.t('nationality'),
      dataIndex: 'nationality',
      render: (value: string) => nationOptionObj[value] || value,
      sorter: (a: FormState, b: FormState) =>
        `${a.nationality} ${a.nationality}`.localeCompare(
          `${b.nationality} ${b.nationality}`
        ),
    },
    {
      title: i18next.t('manage'),
      render: (record: FormState) => (
        <>
          <Button
            type='link'
            onClick={() => handleEdit(record)}
            style={{ color: 'black' }}
          >
            {i18next.t('edit')}
          </Button>
          <Button
            type='link'
            danger
            onClick={() => handleDelete(record)}
            style={{ color: 'black' }}
          >
            {i18next.t('delete')}
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <Checkbox
          checked={selectedRowKeys.length === tableData.length}
          onChange={(e) => {
            setSelectedRowKeys(
              e.target.checked
                ? (tableData
                    .map((item: FormState) => item.id)
                    .filter(Boolean) as React.Key[])
                : []
            );
          }}
        >
          {i18next.t('select')}
        </Checkbox>
        <Button
          danger
          disabled={selectedRowKeys.length === 0}
          style={{ marginLeft: 8 }}
          onClick={() => handleDeleteArray(selectedRowKeys)}
        >
          {i18next.t('delete')}
        </Button>
      </div>

      <Table
        // rowSelection={rowSelection}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        columns={columns}
        dataSource={tableData}
        rowKey='id'
        pagination={{
          pageSize: 2,
          showPrevNextJumpers: true,
          position: ['topRight'],
          itemRender: (page, type, originalElement) => {
            if (type === 'prev') {
              return <span> {i18next.t('prev')}</span>;
            }
            if (type === 'next') {
              return <span> {i18next.t('next')}</span>;
            }
            return originalElement;
          },
        }}
      />
    </div>
  );
};

export default UserTable;
