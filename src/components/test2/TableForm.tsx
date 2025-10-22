import React, { useState } from 'react';
import { Table, Button, Checkbox } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './Table.module.css';
import i18next from 'i18next';

interface UserData {
  key: string;
  name: string;
  gender: string;
  mobile: string;
  nationality: string;
}
type GenderKey = 'male' | 'female' | 'other';

const UserTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const data: UserData[] = [
    {
      key: '1',
      name: 'test12 test12',
      gender: 'male',
      mobile: '+660123456789',
      nationality: 'Thai',
    },
    {
      key: '2',
      name: 'test12 test12',
      gender: 'male',
      mobile: '+660123456789',
      nationality: 'Thai',
    },
    {
      key: '3',
      name: 'test12 test12',
      gender: 'male',
      mobile: '+660123456789',
      nationality: 'Thai',
    },
    {
      key: '4',
      name: 'test12 test12',
      gender: 'male',
      mobile: '+660123456789',
      nationality: 'Thai',
    },
  ];
  const genderOptionObj = i18next.t('genders', {
    returnObjects: true,
  }) as Record<GenderKey, string>;

  const columns: ColumnsType<UserData> = [
    {
      title: i18next.t('name'),
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: i18next.t('gender'),
      dataIndex: 'gender',
      render: (value: GenderKey) => genderOptionObj[value] || value,
    },
    {
      title: i18next.t('mobile'),
      dataIndex: 'mobile',
    },
    {
      title: i18next.t('nationality'),
      dataIndex: 'nationality',
    },
    {
      title: i18next.t('manage'),
      render: () => (
        <>
          <Button type='link' style={{ padding: 0 }}>
            {i18next.t('edit')}
          </Button>
          <Button type='link' danger style={{ padding: 0, marginLeft: 8 }}>
            {i18next.t('delete')}
          </Button>
        </>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <Checkbox
          checked={selectedRowKeys.length === data.length}
          onChange={(e) => {
            setSelectedRowKeys(
              e.target.checked ? data.map((item) => item.key) : []
            );
          }}
        >
          Select All
        </Checkbox>
        <Button
          danger
          disabled={selectedRowKeys.length === 0}
          style={{ marginLeft: 8 }}
        >
          {i18next.t('delete')}
        </Button>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
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
