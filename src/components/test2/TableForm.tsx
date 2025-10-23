import React, { useState } from 'react';
import { Table, Button, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { FormState } from '@/store/formSlice';
import { updateForm } from '@/store/formSlice';
import { deleteUser } from '@/store/userListSlice';
import i18next from 'i18next';
import styles from './Table.module.css';
const UserTable: React.FC = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.userList.users);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const genderOptionObj = i18next.t('genders', {
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
    console.log('data', data);

    dispatch(updateForm(data));
  };

  const columns = [
    {
      title: i18next.t('name'),
      render: (_: any, record: FormState) =>
        `${record.firstname} ${record.lastname}`,
      sorter: (a: FormState, b: FormState) =>
        `${a.firstname} ${a.lastname}`.localeCompare(
          `${b.firstname} ${b.lastname}`
        ),
    },
    {
      title: i18next.t('gender'),
      dataIndex: 'gender',
      render: (value: string) => genderOptionObj[value] || value,
    },
    { title: i18next.t('mobile'), dataIndex: 'mobile' },
    { title: i18next.t('nationality'), dataIndex: 'nationality' },
    {
      title: i18next.t('manage'),
      render: (_: any, record: FormState) => (
        <>
          <Button type='link' onClick={() => handleEdit(record)}>
            {i18next.t('edit')}
          </Button>
          <Button type='link' danger onClick={() => handleDelete(record)}>
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
                    .map((item) => item.id)
                    .filter(Boolean) as React.Key[])
                : []
            );
          }}
        >
          Select All
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
