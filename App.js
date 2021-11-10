import React,{ Component } from 'react';
import {ScrollView ,View,Text,Button} from 'react-native'


class MO extends Component {
  constructor(props){
    super(props);
    this.state = {
      horas: 0,
      minutos:0,
      segundos:0,
      conometroAtivo : false,
      voltas:[]
    }

    this.pulsoDeClock = this.pulsoDeClock.bind(this);
    this.iniciaRelogio = this.iniciaRelogio.bind(this);
    this.pararRelogio = this.pararRelogio.bind(this);
    this.marcarVolta = this.marcarVolta.bind(this);
    this.zerarRelogio = this.zerarRelogio.bind(this);
  }

  iniciaRelogio(){
    if (!this.state.conometroAtivo) {
      this.setState({clock : setInterval(this.pulsoDeClock,1000)});
      this.setState({ativo: true}); 

    }
  }

  pulsoDeClock(){
    var h = this.state.horas;
    var m = this.state.minutos;
    var s = this.state.segundos;
    
    if (s < 59) {
      s++
    }
    else {
      s = 0;
      if(m < 59){
        m++
      }
      else {
        m = 0;
        h++;
      }
    }
    this.setState({segundos:s, minutos:m , horas:h});
  }

  pararRelogio(){
    if (this.state.conometroAtivo) {
      clearInterval(this.state.clock );
      this.setState({ativo:false});
    }
  }

  marcarVolta(){
     var txtDoConometro = this.formatar(this.state.horas) + ':' + this.formatar(this.state.minutos) + ':' + this.formatar(this.state.segundos) + '\n'; 
     this.state.voltas.push(txtDoConometro);
     this.forceUpdate();
  }

  formatar(t){
    return (t<10) ? '0'+t.toString() : t.toString();
  }

  zerarRelogio(){
    this.pararRelogio();
    this.setState({segundos:0, minutos:0,horas:0});

    if(this.state.voltas.length > 0){
      this.state.voltas.push(' ------- \n ')
    }
  }

  render(){
    var txtH = this.formatar(this.state.horas);
    var txtM = this.formatar(this.state.minutos);
    var txtS = this.formatar(this.state.segundos);

    return (
      <ScrollView> 

        <View>
          <Text>Cronômetro</Text>
          <Text>{txtH}:{txtM}:{txtS}</Text>
        </View>
      <View>
        <Button onPress ={(this.state.conometroAtivo ? this.pararRelogio : this.iniciaRelogio)} title = {(this.state.conometroAtivo ? 'Pausar' : 'Começar')} />
        <Button onPress ={this.marcarVolta} title= 'Marcar volta'/>
      <Button onPress ={this.zerarRelogio} title= 'Zerar'/> 
      </View>
        <Text>
          {this.state.voltas}
        </Text>
      </ScrollView>
       
    )
  }
}

export default MO;