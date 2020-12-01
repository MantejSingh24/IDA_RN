import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  useWindowDimensions,
  FlatList,
  Image,
  ScrollView,
  LogBox,
} from 'react-native';
import axios from 'axios';
import {SliderBox} from 'react-native-image-slider-box';
import {Header, SearchBar} from 'react-native-elements';
LogBox.ignoreAllLogs(); //Ignore all log notifications

function HomeScreen() {
  const {width, height} = useWindowDimensions();
  const [heroArea, setHeroArea] = useState([]);
  const [hotArea, setHotArea] = useState();
  const [categories, setCategories] = useState();
  const [bottomBanner, setBottomBanner] = useState([]);
  const [search, setSearch] = useState();

  const apiCall = async () => {
    try {
      const response = await axios.get(
        'https://practicaltest.ncryptedprojects.com/react_native.json',
      );
      var arrHero = [];
      var arrBottom = [];
      Object.values(response.data.data.hero_area).map((e) => {
        arrHero.push(e.image);
      });
      Object.values(response.data.data.bottom_banner).map((e) => {
        arrBottom.push(e.image);
      });
      setHeroArea(arrHero);
      setBottomBanner(arrBottom);
      setCategories(response.data.data.categories);
      setHotArea(response.data.data.hot_products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View style={{flex: 1, height: height}}>
      <Header
        containerStyle={{
          backgroundColor: '#009393',
        }}
        placement={'left'}
        leftComponent={{icon: 'location-on', color: '#fff'}}
        centerComponent={{
          text: 'Mehrauli, South Delhi.',
          style: {color: '#fff', fontSize: 20},
        }}
        rightComponent={{icon: 'face', color: '#fff'}}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View>
          <SearchBar
            placeholder="Search"
            onChangeText={updateSearch}
            value={search}
            containerStyle={{backgroundColor: '#009393'}}
            inputContainerStyle={{backgroundColor: '#FFF', borderRadius: 10}}
            inputStyle={{color: '#009393'}}
          />
        </View>

        <View>
          <SliderBox
            images={heroArea}
            circleLoop
            ImageComponentStyle={{
              borderRadius: 15,
              width: width - 20,
              marginTop: 5,
            }}
          />
        </View>
        <View style={{margin: 10}}>
          <Text style={{fontFamily: 'bold', fontSize: 25}}>Hot products</Text>
          <FlatList
            data={hotArea}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => JSON.stringify(item.id)}
            renderItem={({item}) => (
              <View style={{backgroundColor: '#efefef', margin: 5}}>
                <View
                  style={{
                    backgroundColor: '#fafafa',
                    alignContent: 'flex-start',
                  }}>
                  <Image
                    style={{
                      width: 110,
                      height: 80,
                      borderRadius: 5,
                      alignSelf: 'center',
                    }}
                    source={{uri: item.image}}
                  />
                  <Text style={{fontSize: 15, marginLeft: 5}}>
                    {item.product_name}
                  </Text>
                  <Text style={{fontSize: 15, marginLeft: 5}}>
                    {'₹'}
                    {~~item.price}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      color: '#fff',
                      backgroundColor: '#009393',
                      fontSize: 15,
                      padding: 5,
                      borderBottomLeftRadius: 5,
                    }}>
                    Buy once
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      color: '#fff',
                      backgroundColor: '#f0724e',
                      fontSize: 15,
                      padding: 5,
                      borderBottomRightRadius: 5,
                    }}>
                    Subscribe
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
        <View style={{flex: 1, margin: 10}}>
          <Text style={{fontFamily: 'bold', fontSize: 25}}>
            Browse by category
          </Text>
          <FlatList
            data={categories}
            numColumns={2}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  backgroundColor: '#FFF',
                  justifyContent: 'space-between',
                  margin: 5,
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text>{item.category_name}</Text>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: 32,
                    height: 29,
                    alignSelf: 'center',
                  }}
                />
              </View>
            )}
          />
        </View>
        <SliderBox
          images={bottomBanner}
          circleLoop
          ImageComponentStyle={{
            borderRadius: 15,
            width: width - 20,
            marginTop: 5,
          }}
        />
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
