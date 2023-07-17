import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import { GetOrderUser, selectorder } from '../features/order/orderSlice';
import { selectuserid } from '../features/account/accountSlice';

const StackHistory = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectuserid);
  const orders = useSelector(selectorder);

  console.log(orders)
  useEffect(() => {
    const fetchData = async () => {
      dispatch(GetOrderUser({userId}) as unknown as AnyAction);
    };
    fetchData();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ marginTop: 30,fontSize:25,marginLeft:10,fontWeight:'600' }}>The item you ordered</Text>
        {orders.map((order: any) => (
          <View key={order.id} style={styles.card}>
            <Text style={{textAlign:'center',fontWeight:'600',fontSize:18}}>{order.id}</Text>
            <Text>Time : {order.orderDate}</Text>
            <Text>Total Price{order.totalAmount}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default StackHistory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth:1
  },
})
